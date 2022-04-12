<!--展示总的组织文件-->
<template>
  <el-container>
    <el-dialog
        :visible="createOrgVisible"
        center
        title="创建组织"
        width="30%"
    >
      <div>
        <el-input v-model="newOrgName" placeholder="请输入组织名称"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="this.CreOrg">确 定</el-button>
        <el-button @click="createOrgVisible = false;newOrgName=''">取 消</el-button>
      </div>
    </el-dialog>
    <el-header>
      <el-button size="normal" type="primary" @click="createOrgVisible=true">创建组织</el-button>
      <el-button size="normal">加入组织</el-button>
      <!--			<el-button size="danger" >退出当前组织</el-button>-->
      <!--			<el-button size="danger" >删除当前组织</el-button>-->
    </el-header>
    <el-main>
      <el-card v-for="(item,index) in tableData" :key="index" shadow="hover">
        <p class="orgName">{{ item.orgName }}</p>
        <p class="whoMake">由 {{ item.whoMake }} 创建</p>
      </el-card>
    </el-main>
    <el-footer>
      <!--      此处为 组织内文件 -->
      <router-view></router-view>
    </el-footer>
  </el-container>
</template>

<script>
// import {createOrg, UserOrgs} from "@/assets/js/api"

export default {
  name: "Organization",
  // data() {
  //   return {
  //     tableData: [
  //       // {
  //       // 	orgName: '组织1',
  //       // 	whoMake: '自己',
  //       // }
  //     ],
  //     createOrgVisible: false,
  //     newOrgName:''
  //   }
  // },
  // mounted() {
  //
  //   this.refreshOrg();
  // },
  updated() {
    if (this.tableData.length != 0) {
      this.goPath = this.tableData[0].orgId

    }
  }
  ,
  // methods: {
  //   CreOrg() {
  //     const name = this.newOrgName;
  //     const pid = window.sessionStorage.userId
  //     createOrg(name, pid).then((data) => {
  //       if (data.status === 200) {
  //         this.$notify({
  //           title: '消息',
  //           message: '创建组织成功！',
  //           type: 'success'
  //         })
  //         this.createOrgVisible = false
  //         this.newOrgName = ''
  //         this.refreshOrg();
  //       }
  //     })
  //   },
    // refreshOrg() {
    //   if (this.tableData.length > 0) {
    //     this.tableData.splice(0, this.tableData.length);
    //   }
    //   UserOrgs(window.sessionStorage.getItem('userId'), 'created').then((data) => {
    //     console.log('创建的：', data)
    //     for (let i = 0; i < data.length; i++) {
    //       this.tableData.push({
    //         orgName: data[i].name,
    //         whoMake: '自己',
    //         orgId: data[i].id
    //       })
    //     }
    //   })
    //   UserOrgs(window.sessionStorage.getItem('userId'), 'joined').then((data) => {
    //     console.log('加入的：', data)
    //     for (let i = 0; i < data.length; i++) {
    //       this.tableData.push({
    //         orgName: data[i].name,
    //         whoMake: '自己',
    //         orgId: data[i].id
    //       })
    //     }
    //   })
    //
    // }
  // }
}

</script>

<style lang="less" scoped>
@import "../../assets/css/Global";

.el-container {
  box-sizing: border-box;
  //border: 1.5px solid @line_color2;
  border-radius: 5px;
  height: 100%;
  background-color: #fff;

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
    //flex: 0 !important;
  }

  .el-footer {
    height: auto !important;
    margin: 0 20px;
    padding: 0;
    flex: 1;
  }

  .el-main {
    flex: 1;
    padding-bottom: 0;

    .el-card {
      float: left;
      width: 336px;
      margin: 0 20px 40px;

      .orgName {
        font-size: 20px;
      }

      .whoMake {
        font-size: 16px;
      }
    }
  }


}
</style>
