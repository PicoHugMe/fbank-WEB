<template>
	<el-container class="fileMain">
		<el-dialog :visible.sync="confirmNewFolder" center title="新建文件夹" width="30%">
			<div>
				<el-input v-model="newFolderName" placeholder="请输入文件夹名"></el-input>
			</div>
			<div class="dialog-footer">
				<el-button type="primary" @click="this.addFolder">确 定</el-button>
				<el-button @click="confirmNewFolder = false;newFolderName=''">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="confirmRename" center title="重命名" width="30%">
			<div>
				<el-input v-model="renameFFName" placeholder="请输入新名称"></el-input>
			</div>
			<div class="dialog-footer">
				<el-button type="primary" @click="renameFF(selectedId)">确 定</el-button>
				<el-button @click="confirmRename = false;renameFFName='';selectedId=''">取 消</el-button>
			</div>
		</el-dialog>
		
		
		<el-header>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item v-for="(item,i) in nowFilePath" :key="i">
					<el-link @click="refreshPath(item,i)">
						{{ item.pathName }}
					</el-link>
				</el-breadcrumb-item>
				<div class="addMore">
					<i class="el-icon-plus"></i>
					<div class="add">
						<el-upload
							:action="uploadUrl()"
							:auto-upload="true"
							:file-list="fileList"
							:headers="myHeaders"
							:on-progress="uploadProgress"
							:on-success="isOK"
							:show-file-list="false"
							multiple>
							<el-button class="newUpload" plain size="small" type="primary">上传文件</el-button>
						</el-upload>
						<el-button class="newFolder" plain size="small" type="primary" @click="confirmNewFolder=true">新建文件夹
						</el-button>
					</div>
				</div>
			</el-breadcrumb>
		</el-header>
		
		
		<el-main v-loading="isLoading" class="mainBox">
			<el-table
				:data="tableData"
				style="width: 100%;"
			>
				<el-table-column label="名称" prop="filename">
					<template slot-scope="scope">
						<el-link @click="openOrDownloadFile(scope.row.isDir,scope.row.fileId,scope.row.filename)">
							{{ scope.row.filename }}
						</el-link>
					</template>
				</el-table-column>
				<!--				<el-table-column prop="tag" label="标签"></el-table-column>-->
				<el-table-column label="修改日期" prop="updateTime"></el-table-column>
				<el-table-column label="文件大小" prop="fileSize"></el-table-column>
				<el-table-column label="操作" prop="actions">
					<template slot-scope="scope">
						<div class="action">
							<i class="el-icon-more"></i>
							<div class="actions">
								<el-row>
									<el-button size="mini" @click="selectedId=scope.row.fileId;confirmRename=true;renameFFName=`${scope.row.filename}`">
										重命名
									</el-button>
								</el-row>
								<el-row>
									<el-button :disabled="scope.row.isDir" size="mini" @click="openOrDownloadFile(scope.row.isDir,scope.row.fileId)">下载
									</el-button>
								</el-row>
								<el-row>
									<el-button size="mini" @click="deleteFileOrFolder(scope.row.isDir,scope.row.fileId)">删除</el-button>
								</el-row>
							</div>
						</div>
					</template>
				</el-table-column>
			
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination
				:current-page.sync="pageIndex"
				:page-size="pageSize"
				:total="totalItems"
				background
				layout="prev, pager, next"
				@current-change="refreshFiles()">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
import {deleteFile, deleteFolder, downloadFile, getPathFiles, newFolder, renameFFs} from "@/assets/js/api";

export default {
	name: "Files",
	data() {
		return {
			myHeaders: {'Authorization': "Bearer "+eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')').access_token},
			tableData: [],
			isLoading: true, //加载动画
			modHeight: '100%',//调整高度,暂不启用
			pageIndex: 1,//当前页数
			pageSize: 9,//一页显示几个
			totalItems: 0,//总项目个数
			totalPages: 1,
			DirId: '',
			selectedId: '',
			newFolderName: '',
			renameFFName: '',
			confirmRename: false,
			confirmNewFolder: false,
			fileList: [],
			nowFilePath: [
				{
					pathId: '',
					pathName: ''
				}
			]
		}
	},
	beforeMount() {
		if (this.goPath == '') {
			this.nowFilePath.pop()
			this.nowFilePath.push({
				pathId: '',
				pathName: '私人知识库'
			})
		}
	}
	,
	mounted() {
		// console.log('propPath:', this.goPath)
		this.refreshFiles();
	},
	methods: {
		refreshPath(item, i) {
			this.nowFilePath = this.nowFilePath.slice(0, i + 1)
			this.refreshFiles(item.pathId);
		},
		//刷新文件列表 refreshFiles
		refreshFiles(dirId) {
			this.isLoading = true;
			const _this = this;
			//清空文件列表 tableData
			if (_this.tableData.length > 0) {
				_this.tableData.splice(0, _this.tableData.length);
			}
			//从data定义新数据
			const pageInfo = {
				DirId: dirId,
				PageIndex: _this.pageIndex,
				PageSize: _this.pageSize,
				sorting: 'Id'
			}
			// console.log('dirId:', dirId)
			//调用getPathFiles获取当前目录下的新文件
			getPathFiles(pageInfo).then((data) => {
				if (data.items.length > 0) {
					// console.log('data:', data)
					//刷新页码组件
					// _this.pageIndex = _this.
					// _this.pageSize = data.pageSize;
					_this.totalItems = data.totalItems;
					_this.totalPages = data.totalPages;
					data = data.items;
					for (let i = 0; i < _this.pageSize && i < data.length; i++) {
						const tempData = data[i];
						// tempData.length = fileSizeTransfer(tempData.size)
						let newItem = {};
						if (tempData.isDir === true) {
							//是个文件夹，所以需要fileUrl
							newItem = {
								userId: tempData.creatorId,
								filename: tempData.name,
								ext: tempData.ext,
								isDir: tempData.isDir,
								fileId: tempData.id,
								updateTime: tempData.lastModificationTime? tempData.lastModificationTime:tempData.creationTime,
								fileSize: tempData.length,
								// wtType: this.whatType(tempData.ext),
								fileUrl: tempData.id
							}
						} else {
							//非文件夹，无需fileurl
							newItem = {
								userId: tempData.creatorId,
								filename: tempData.name,
								isDir: tempData.isDir,
								fileId: tempData.id,
								updateTime: tempData.createdDate,
								fileSize: tempData.length,
								// wtType: this.whatType(tempData.ext),
							}
						}
						// console.log('newitem:', newItem)
						_this.tableData.push(newItem)
					}
				}
				this.isLoading = false;
				// console.log(data)
			})
		},
		openOrDownloadFile(isDir, path, name) {
			const _this = this;
			if (isDir === true) {
				this.nowFilePath.push({pathId: path, pathName: name})
				_this.pageIndex = 1;
				_this.refreshFiles(path);
			} else {
				console.log('download path' + path)
				downloadFile(path).then(response=>{
					this.download(response,name)
				})
				// window.location.href = `http://localhost:8080/api/private/download?userId=${window.sessionStorage.userId}&fileId=${path}`;
			}
		},
		deleteFileOrFolder(isDir, id) {
			if (isDir) {
				deleteFolder(id).then((data) => {
					if (data == 200) {
						this.$notify({
							title: '消息',
							message: '删除成功！',
							type: 'success'
						})
						this.refreshFiles();
					}
					
				})
			} else {
				deleteFile(id).then((data) => {
					if (data == 200) {
						this.$notify({
							title: '消息',
							message: '删除成功！',
							type: 'success'
						})
						this.refreshFiles();
					}
					
				})
			}
			
		},
		renameFF(id) {
			if (this.renameFFName.length < 1) {
				this.$message('名称禁止为空')
			} else {
				renameFFs(id, this.renameFFName).then(() => {
					this.confirmRename = false;
					this.$notify({
						title: '消息',
						message: '重命名成功！',
						type: 'success'
					})
					this.refreshFiles()
				})
			}
		},
		uploadProgress() {
			this.$notify.info({
				title: '文件上传消息',
				message: '文件上传中...'
			});
		},
		isOK() {
			this.$notify({
				title: '文件上传消息',
				message: '文件上传成功！',
				type: 'success'
			})
			this.refreshFiles(this.nowFilePath[this.nowFilePath.length - 1].pathId);
		},
		uploadUrl() {
			if (this.nowFilePath.length === 1) {
				return 'http://localhost:8080/api/private/files'
			} else {
				return 'http://localhost:8080/api/private/files?DirId=' + this.nowFilePath[this.nowFilePath.length - 1].pathId
			}
		},
		addFolder() {
			this.confirmNewFolder = false
			if (this.newFolderName === '') {
				this.$notify({
					title: '消息',
					message: '文件夹新建失败！',
					type: 'error'
				})
			} else {
				const lastOne = this.nowFilePath[this.nowFilePath.length - 1];
				newFolder(lastOne.pathId, this.newFolderName).then(() => {
					this.refreshFiles(lastOne.pathId)
				})
				this.$notify({
					title: '消息',
					message: '文件夹新建成功！',
					type: 'success'
				})
			}
			
		},
		download(data,name){
			if (!data){
				return
			}
			let url=window.URL.createObjectURL(new Blob([data]))
			let link=document.createElement('a')
			link.style.display='none'
			link.href=url
			link.setAttribute('download',name)
			document.body.appendChild(link)
			link.click()
		}
		
	},
	props: {
		goPath: {
			type: String,
			required: false,
			// default: window.sessionStorage.getItem('userId')
			default: ''
		}
	},
}
</script>

<style lang="less" scoped>
@import "src/assets/css/FileColor";
@import "src/assets/css/Global";

.el-container {
	height: 100%;
	border: 0;
	
	.dialog-footer {
		text-align: center;
		margin-top: 25px;
	}
}

.fileMain {
	border: 0 !important;
}

.el-header {
	height: 40px !important;
}

.el-main {
	padding: 0;
	padding-left: 20px;
	padding-right: 20px;
	
	/deep/ .el-table__body-wrapper {
		overflow: initial;
	}
	
	.el-table {
		overflow: initial;
		
	}
	
	.action {
		width: 23px;
		height: 23px;
		cursor: pointer;
	}
	
	.actions {
		text-align: center;
		display: none;
		position: absolute;
		z-index: 999;
		//background-color: #F2F6FC;
		background-color: #fff;
		cursor: pointer;
		border-radius: 5px;
		border: 1px solid #EBEEF5;
		border-bottom: 0;
		
		.el-row {
			
			> .el-button {
				width: 100%;
				border-right: 0;
				border-left: 0;
				border-radius: 1px;
				border-top: 0;
				
			}
		}
		
		.tags {
			padding-left: 12px;
			padding-right: 12px;
			text-align: left;
			font-size: 12px;
			border-bottom: 1px solid #dcdfe6;
			
			div:nth-child(2) {
				margin-top: -6px;
			}
			
			.el-button {
				margin-bottom: 6px;
			}
			
		}
		
	}
	
	.action:hover .actions {
		display: inline-block;
		float: left;
	}
	
}

.el-breadcrumb {
	.addMore {
		float: left;
		position: relative;
		top: -2px;
		box-sizing: border-box;
		
		.add {
			display: none;
			left: -31.5px;
			padding-top: 5px;
			top: 15px;
			position: absolute;
			//border: 1.5px solid @line_color1;
			border-radius: 3px;
			
			.newUpload {
				width: 100%;
				margin-bottom: 1px;
			}
			
			.newFolder {
				width: 80px;
				padding-left: 7px;
				padding-right: 7px;
			}
		}
	}
	
	.addMore:hover .add {
		display: inline-block;
		z-index: 999;
	}
	
	.addMore > .el-icon-plus {
		border-radius: 50%;
		border: 2px solid @line_color1;
		font-size: @line_color1;
	}
}

.el-footer {
	height: 40px !important;
	text-align: center;
}

</style>
