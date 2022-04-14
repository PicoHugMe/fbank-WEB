<template>
  <el-container>
    <el-dialog
        :visible="createOrgVisible"
        center
        width="30%"
        title="创建组织"
    >
      <div>
        <el-input v-model="newOrgName" placeholder="请输入组织名称"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="this.CreOrg">确 定</el-button>
        <el-button @click="createOrgVisible = false;newOrgName=''">取 消</el-button>
      </div>
    </el-dialog>
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
    <el-dialog :visible.sync="orgUserManage" center title="组织成员管理" width="40%">
      <el-table :data="orgUsers" style="width: 100%">
        <el-table-column prop="username" label="用户" ></el-table-column>
        <el-table-column width="100px"><el-button>移除</el-button></el-table-column>

      </el-table>
    </el-dialog>


    <el-header>
      <el-button size="normal" type="primary" @click="createOrgVisible=true">创建组织</el-button>
      <el-button size="normal">加入组织</el-button>
      <el-button size="normal" @click="orgUserManage=true">组织成员管理</el-button>
      <el-button size="danger">退出当前组织</el-button>
      <el-button size="danger">删除当前组织</el-button>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--        面包屑 - 路径 -->
<!--        <el-breadcrumb-item>-->
<!--          <el-link>[{{this.$route.query.pName}}]</el-link>-->
<!--        </el-breadcrumb-item>-->
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
        <el-table-column label="修改日期" prop="updateTime"></el-table-column>
        <el-table-column label="文件大小" prop="fileSize"></el-table-column>
        <el-table-column label="操作" prop="actions">
          <template slot-scope="scope">
            <div class="action">
              <i class="el-icon-more"></i>
              <div class="actions">
                <el-row>
                  <el-button size="mini"
                             @click="selectedId=scope.row.fileId;confirmRename=true;renameFFName=`${scope.row.filename}`">
                    重命名
                  </el-button>
                </el-row>
                <el-row>
                  <el-button :disabled="scope.row.isDir" size="mini"
                             @click="openOrDownloadFile(scope.row.isDir,scope.row.fileId)">下载
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
import {createOrg,deleteFolder,deleteFile,newFolder,renameFFs,getPathFiles} from "@/assets/js/api";
import {fileSizeTransfer, formatDateTime} from "@/assets/js/Global";

export default {
  name:"Files",
  data(){
    return{
      createOrgVisible:false,
      newOrgName:'',
      orgData:[
        // {
        //   orgName:'组织1',
        //   orgOwner:'赵加威',
        //   orgId:'cscascsac'
        // }
      ],
      nowFilePath: [
        {
          pathId: this.$route.query.pId,
          pathName: this.$route.query.pName
        }
      ],
      orgUsers:[
        {username:'testname@123.com'},
        {username:'testname@456.com'},
        {username:'testname@789.com'}
      ],
      orgUserManage:false,
      confirmRename: false,
      confirmNewFolder: false,
      isLoading:true,
      fileList: [],
      myHeaders: {'Authorization': window.sessionStorage['access_token']},
      tableData: [],
      selectedId: '',
      renameFFName: '',
      pageIndex: 1,
      pageSize: 9,
      totalItems: 0,
      totalPages: 1,
      DirId: '',
      newFolderName: '',

    }
  },
  mounted(){
    // console.log('props是'+this.$route.query.pId)
    this.refreshFiles(this.$route.query.pId);

  },
  methods:{
    //创建组织
    CreOrg(){
      this.$store.commit('changeOrg',[
        {
          label:'技术部门',
          id:'c4ed38a2-3e10-415e-adf4-1c140cc74fa3',
          children:[{
            label: '产品设计部门',
            id:'b94892ed-a71e-491c-a674-71303eebc073',
          },{
            label: '界面设计部门',
            id:'d53d614c-d73e-4ad8-be8d-acf841e0ad32',
            children:[{
              label:'后台界面设计',
              id:'csdsd'
            }]
          },{
            label: '交互设计部门',
            id:'d53d614c-d73e-4ad8-be8d-acf841e0ad32',
          },]
        },{
          label: '前端开发部门',
          id:'06f2cc3c-db18-4d7b-a8cf-076abbb16648',
        },{
          label: '后端开发部门',
          id:'06f2cc3c-db18-4d7b-a8cf-076abbb16648',
        }
      ])
      // const name = this.newOrgName;
      // const pid = window.sessionStorage.userId
      // createOrg(name, pid).then((data) => {
      //   if (data.status === 200) {
          this.$notify({
            title: '消息',
            message: '创建组织成功！',
            type: 'success'
          })
          this.createOrgVisible = false
          this.newOrgName = ''
          this.refreshOrg();
        // }
      // })
    },

  //  刷新组织
    refreshOrg(){
      // if (this.orgData.length>0){
      //   this.orgData.splice(0,this.orgData.length);
      // }
      // //创建的组织
      // UserOrgs(window.sessionStorage.getItem('userId'), 'created').then((data) => {
      //   console.log('创建的：', data)
      //   for (let i = 0; i < data.length; i++) {
      //     this.orgData.push({
      //       orgName: data[i].name,
      //       orgOwner: '自己',
      //       orgId: data[i].id
      //     })
      //   }
      // })
      // //加入的组织
      // UserOrgs(window.sessionStorage.getItem('userId'), 'joined').then((data) => {
      //   console.log('加入的：', data)
      //   for (let i = 0; i < data.length; i++) {
      //     this.orgData.push({
      //       orgName: data[i].name,
      //       orgOwner: '自己',
      //       orgId: data[i].id
      //     })
      //   }
      // })
    },
    refreshPath(item, i) {
      this.nowFilePath = this.nowFilePath.slice(0, i + 1)
      this.refreshFiles(item.pathId);
    },
    uploadUrl() {
      console.log(this.nowFilePath.length)
      // if (this.nowFilePath.length === 1) {
      //   return 'http://localhost:8080/api/private'
      // } else {
        return 'http://localhost:8080/api/private?DirId=' + this.nowFilePath[this.nowFilePath.length - 1].pathId
      // }
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
    openOrDownloadFile(isDir, path, name) {
      const _this = this;
      if (isDir === true) {
        this.nowFilePath.push({pathId: path, pathName: name})
        _this.pageIndex = 1;
        _this.refreshFiles(path);
      } else {
        console.log('download path' + path)
        window.location.href = `http://localhost:8080/api/private/download?userId=${this.$store.state.userInfo.userId}&fileId=${path}`;
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
            this.refreshFiles(this.nowFilePath[this.nowFilePath.length - 1].pathId);
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
            this.refreshFiles(this.nowFilePath[this.nowFilePath.length - 1].pathId);
          }

        })
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
        newFolder(this.nowFilePath[this.nowFilePath.length - 1].pathId, this.newFolderName).then(() => {
          this.refreshFiles(this.nowFilePath[this.nowFilePath.length - 1].pathId)

        })
        this.$notify({
          title: '消息',
          message: '文件夹新建成功！',
          type: 'success'
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
          this.refreshFiles(this.nowFilePath[this.nowFilePath.length - 1].pathId);
        })
      }
    },
    refreshFiles(dirId) {
      if (dirId==undefined){
        dirId=this.$route.query.pId
      }
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
      console.log('dirId:', dirId)
      //调用getPathFiles获取当前目录下的新文件
      getPathFiles(pageInfo).then((data) => {
        if (data.items.length > 0) {
          console.log('data:', data)
          //刷新页码组件
          _this.pageIndex = data.pageIndex;
          _this.pageSize = data.pageSize;
          _this.totalItems = data.totalItems;
          _this.totalPages = data.totalPages;
          data = data.items;
          for (let i = 0; i < _this.pageSize && i < data.length; i++) {
            const tempData = data[i];
            tempData.length = fileSizeTransfer(tempData.size)
            let newItem = {};
            tempData.createdDate = formatDateTime(tempData.createdDate);
            if (tempData.isDir === true) {
              //是个文件夹，所以需要fileUrl
              newItem = {
                userId: tempData.userId,
                filename: tempData.name,
                ext: tempData.ext,
                isDir: tempData.isDir,
                fileId: tempData.id,
                updateTime: tempData.updateTime,
                fileSize: '',
                // wtType: this.whatType(tempData.ext),
                fileUrl: tempData.id
              }
            } else {
              //非文件夹，无需fileurl
              newItem = {
                userId: tempData.userId,
                filename: tempData.name,
                isDir: tempData.isDir,
                fileId: tempData.id,
                updateTime: tempData.createdDate,
                fileSize: tempData.length,
                // wtType: this.whatType(tempData.ext),
              }
            }
            // console.log(newItem)
            _this.tableData.push(newItem)
          }
        }
        this.isLoading = false;
      })
    },

  },
  props:['pId']
}
</script>

<style lang="less" scoped>
@import "../../assets/css/Global";
@import "src/assets/css/FileColor";
.el-container{
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  border: 0;
  .dialog-footer {
    text-align: center;
    margin-top: 25px;
  }
  .el-header {
    padding: 20px 40px;

    .el-button {
      margin-right: 20px;
    }
  }

  .el-main {
    //flex: 1;
    padding-bottom: 0;
    padding-left: 40px;
    /deep/ .el-table__body-wrapper {
      //height: 200px;
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

  .el-footer {
    height: auto !important;
    margin: 0 20px;
    padding: 0;
    flex: 1;
  }
}

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
.el-footer {
  height: 40px !important;
  text-align: center;
}
.el-table{
  overflow: initial;
}
</style>
