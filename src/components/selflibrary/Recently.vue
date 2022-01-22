<template>
	<el-container>
		<el-dialog title="重命名" :visible.sync="confirmRename" width="30%" center>
			<div>
				<el-input placeholder="请输入新名称" v-model="renameFFName"></el-input>
			</div>
			<div class="dialog-footer">
				<el-button type="primary" @click="renameFF(selectedId)">确 定</el-button>
				<el-button @click="confirmRename = false;renameFFName='';selectedId=''">取 消</el-button>
			</div>
		</el-dialog>
		<el-main v-loading="isLoading" class="mainBox">
			<el-table
				:data="tableData"
				style="width: 100%;"
			>
				<el-table-column prop="filename" label="名称">
					<template slot-scope="scope">
						<el-link @click="openOrDownloadFile(scope.row.isDir,scope.row.fileUrl)">
							{{ scope.row.filename }}
						</el-link>
					</template>
				</el-table-column>
				<!--				<el-table-column prop="tag" label="标签"></el-table-column>-->
				<el-table-column prop="updateTime" label="修改日期"></el-table-column>
				<el-table-column prop="actions" label="操作">
					<template slot-scope="scope">
						<div class="action">
							<i class="el-icon-more"></i>
							<div class="actions">
								<el-row class="tags">
									<div>标签</div>
									<div>
										<el-button type="danger" circle size="mini"></el-button>
										<el-button type="warning" circle size="mini"></el-button>
										<el-button type="success" circle size="mini"></el-button>
										<el-button type="info" circle size="mini"></el-button>
									</div>
								</el-row>
								<el-row>
									<el-button size="mini" @click="selectedId=scope.row.fileId;confirmRename=true;">重命名</el-button>
								</el-row>
								<el-row>
									<el-button size="mini" @click="openOrDownloadFile(scope.row.isDir,scope.row.fileUrl)">下载</el-button>
								</el-row>
								<el-row>
									<el-button size="mini">分享</el-button>
								</el-row>
								<el-row>
									<el-button size="mini" @click="deleteFileOrFolder(scope.row.fileId)">删除</el-button>
								</el-row>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="fileSize" label="文件大小"></el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination
				background
				layout="prev, pager, next"
				@current-change="refreshFiles()"
				:current-page.sync="pageIndex"
				:page-size="pageSize"
				:total="totalItems">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
import {deleteFile, getRecentPathFiles, newFolder,renameFFs} from "@/assets/js/api";
import {fileSizeTransfer} from "@/assets/js/Global";

export default {
	name: "Recently",
	data() {
		return {
			tableData: [],
			isLoading: true, //加载动画
			modHeight: '100%',//调整高度,暂不启用
			pageIndex: 1,
			pageSize: 9,
			totalItems: 0,
			totalPages: 1,
			DirId: '',
			selectedId:'',
			newFolderName:'',
			renameFFName:'',
			confirmRename: false,
			confirmNewFolder:false,
			fileList: [],
			nowFilePath: [
				{
					pathId: '',
					pathName: '私人知识库'
				}]
		}
	},
	mounted() {
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
				PageSize: _this.pageSize
			}
			console.log('dirId:', dirId)
			//调用getPathFiles获取当前目录下的新文件
			getRecentPathFiles(pageInfo).then((data) => {
				if (data.isSuccessed === true) {
					data = data.response;
					console.log('data:', data)
					//刷新页码组件
					_this.pageIndex = data.pageIndex;
					_this.pageSize = data.pageSize;
					_this.totalItems = data.totalItems;
					_this.totalPages = data.totalPages;
					data = data.items;
					for (let i = 0; i < _this.pageSize && i < data.length; i++) {
						const tempData = data[i];
						tempData.length = fileSizeTransfer(tempData.length)
						let newItem = {};
						if (tempData.isDir === true) {
							newItem = {
								userId: tempData.userId,
								filename: tempData.name,
								ext: tempData.ext,
								isDir: tempData.isDir,
								fileId: tempData.id,
								updateTime: tempData.updateTime,
								fileSize: '',
								wtType: this.whatType(tempData.ext),
								fileUrl: tempData.id
							}
						} else {
							newItem = {
								userId: tempData.userId,
								filename: tempData.name + tempData.ext,
								ext: tempData.ext,
								isDir: tempData.isDir,
								fileId: tempData.id,
								updateTime: tempData.updateTime,
								fileSize: tempData.length,
								wtType: this.whatType(tempData.ext),
								fileUrl: tempData.url
							}
						}
						// console.log(newItem)
						_this.tableData.push(newItem)
					}
				}
				this.isLoading = false;
			})
		},
		//whatType：通过后缀判断文件类型，以给予tag标签颜色
		whatType: function (wtType) {
			switch (wtType) {
				case '.MD':
					wtType = '#icon-txt-1';
					break;
				case '.jpg' | '.jpeg':
					wtType = '#icon-JPG';
					break;
				case '.doc' | '.docx':
					wtType = '#icon-DOCX';
					break;
				case '.mp4':
					wtType = '#icon-DOCX';
					break;
				default:
					wtType = 'info';
					break;
			}
			return wtType;
		},
		//openOrDownloadFile：打开文件夹或下载文件
		openOrDownloadFile(isDir, path) {
			const _this = this;
			console.log('download path' + path)
			if (isDir === true) {
				// this.nowFilePath.push({pathId: path, pathName: name})
				// _this.pageIndex = 1;
				_this.refreshFiles(path);
			} else {
				window.location.href = 'http://localhost:8080/api/file/' + path
			}
		},
		deleteFileOrFolder(id) {
			deleteFile(id).then((data) => {
				if (data.isSuccessed === true) {
					this.$message("删除成功")
					this.refreshFiles();
				}
			})
		},
		renameFF(id){
			if (this.renameFFName.length<1){
				this.$message('名称禁止为空')
			}else{
				renameFFs(id,this.renameFFName).then(()=>{
					this.confirmRename=false
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
			this.refreshFiles(this.nowFilePath[this.nowFilePath.length-1].pathId);
		},
		uploadUrl(){
			if (this.nowFilePath.length===1){
				return 'http://localhost:8080/api/file/fbank'
			}else{
				return 'http://localhost:8080/api/file/fbank?DirId='+this.nowFilePath[this.nowFilePath.length-1].pathId
			}
		},
		addFolder(){
			this.confirmNewFolder=false
			if (this.newFolderName===''){
				alert('创建失败')
			}else{
				const lastOne=this.nowFilePath[this.nowFilePath.length-1];
				newFolder(lastOne.pathId,this.newFolderName).then((data)=>{
					console.log(data);
					this.refreshFiles(lastOne.pathId)
				})
			}
			
		}
		
		
	},
	computed: {}
}
</script>

<style scoped lang="less">
@import "src/assets/css/FileColor";
@import "src/assets/css/Global";

.el-container {
	height: 100%;
	border: 0;
	.dialog-footer{
		text-align: center;
		margin-top: 25px;
	}
}
.el-header{
	height: 40px !important;
}
.el-main {
	padding: 0;
	padding-left: 20px;
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
			.newUpload{
				width: 100%;
				margin-bottom: 1px;
			}
			.newFolder{
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