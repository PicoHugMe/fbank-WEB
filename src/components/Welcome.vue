<template>
	<el-container class="root">
		<el-header>
			<el-button @click="testaaa()">Lorem ipsum dolor sit amet.</el-button>
			<el-row>
				<el-col :span="12">
					<img alt="" src="../assets/pic/chang_clear_noword_256.png"/>
				</el-col>
				<el-col :span="12">
					<div class="notify"></div>
					<div class="self">
						
						<img
							alt="用户头像"
							src='../assets/pic/default_user.svg'
						/>
						<span>{{ userInfo.username }}&ensp;</span>
						<el-button @click="exitAll()" size="mini">退出</el-button>
						<!--            <i class="el-icon-arrow-down"></i>-->
						<!--						<div class="moreInfo"></div>-->
					</div>
				
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu
					:default-active="$route.path"
					router
				>
					<!--					class="el-menu-vertical-demo">-->
					<!--					<el-submenu index="1-1">-->
					<!--						<template slot="title">-->
					<!--							<i class="el-icon-s-home"></i>-->
					<!--							<span>个人中心</span>-->
					<!--						</template>-->
					<!--						<el-menu-item-group>-->
					<!--							&lt;!&ndash;							<template slot="title"></template>&ndash;&gt;-->
					<!--							<el-menu-item index="1-1">我的</el-menu-item>-->
					<el-menu-item disabled index="" style="text-align: center;padding-left: 0;font-size: 1.05rem">个人
					</el-menu-item>
					<el-menu-item index="/Welcome/SelfLibrary/Files" style="text-align: center;padding-left: 0" id="selfLib">
						私人知识库
					</el-menu-item>
					
					<!--							<el-menu-item index="1-3">待办事项</el-menu-item>-->
					<!--							<el-menu-item index="1-4">企业服务</el-menu-item>-->
					<!--							<el-menu-item index="1-5" ><router-link to="/logins/login/signin" replace>登录</router-link></el-menu-item>-->
					<!--						</el-menu-item-group>-->
					<!--					</el-submenu>-->
					<!--					<el-submenu index="2">-->
					<!--						<template slot="title">-->
					<!--							<i class="el-icon-s-comment"></i>-->
					<!--							<span>站内通讯</span>-->
					<!--						</template>-->
					<!--						<el-menu-item-group>-->
					<!--							&lt;!&ndash;							<template slot="title"></template>&ndash;&gt;-->
					<!--							<el-menu-item index="2-1">私聊</el-menu-item>-->
					<!--							<el-menu-item index="2-2">通知</el-menu-item>-->
					<!--						</el-menu-item-group>-->
					<!--					</el-submenu>-->
					<!--					<el-menu-item index="3">-->
					<!--						<span slot="title">通讯录</span>-->
					<!--					</el-menu-item>-->
					<el-menu-item disabled index="" style="text-align: center;padding-left: 0;font-size: 1.05rem">我的组织
					</el-menu-item>
					<!--						<template slot="title">-->
					<!--							<i class="el-icon-s-comment"></i>-->
					<!--							<span>通讯录</span>-->
					<!--						</template>-->
					<!--						<el-menu-item-group>-->
					<!--							&lt;!&ndash;							<template slot="title"></template>&ndash;&gt;-->
					<!--							<el-menu-item index="2-1">私聊</el-menu-item>-->
					<!--							<el-menu-item index="2-2">通知</el-menu-item>-->
					<!--						</el-menu-item-group>-->
				
				</el-menu>
				<el-tree :data="orgTree" @node-click="handleNodeClick"></el-tree>
			</el-aside>
			<el-container>
				<el-main>
					<div class="main-inside" style="height: 100%">
						<router-view></router-view>
					</div>
				
				</el-main>
				<!--							<el-footer>Footer</el-footer>-->
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
// import {getUserInfo} from "@/assets/js/api";
import mgr from '@/assets/js/SecurityService'

export default {
	data() {
		return {
			userInfo: {
				username: '',
				sex: 2,
				email: ''
			},
			orgTree: [
				//     {
				//   label:'技术部门',
				//       id:'c4ed38a2-3e10-415e-adf4-1c140cc74fa3',
				//   children:[{
				//     label: '产品设计部门',
				//     id:'b94892ed-a71e-491c-a674-71303eebc073',
				//   },{
				//     label: '界面设计部门',
				//     id:'d53d614c-d73e-4ad8-be8d-acf841e0ad32',
				//   }]
				// },{
				//   label: '前端开发部门',
				//     id:'06f2cc3c-db18-4d7b-a8cf-076abbb16648',
				//   },{
				//     label: '后端开发部门',
				//     id:'06f2cc3c-db18-4d7b-a8cf-076abbb16648',
				//   }
			],
			tempTree: []
		}
	},
	created() {
		// mgr.signinRedirect().then((data)=>{
		// 	console.log('welcome第一次输出data',data)
		// })
		// mgr.getUser().then((data)=>{
		// 	console.log('data222:',data)
		// })
		if (window.localStorage.getItem('isLoading')!='true'){
			if (window.localStorage.getItem('isLoading')!='loading'){
				window.localStorage.setItem('isLoading','loading')
				mgr.signinRedirectCallback().then((data)=>{
					console.log('callback的data',data)
					window.localStorage.setItem('isLoading','true')
				})
			}
		}

		
		// this.mgr.signinRedirectCallback(url).then(function (loggedUser) {
		//   console.log(loggedUser)
		//   ///// the logged user contains the user info
		// });
		// if (window.localStorage)
		// if (!window.sessionStorage.success) {
		//   this.$router.push({path: '/logins/login/signin'});
		//   this.$message({
		//     type: 'error',
		//     message: '非法访问！'
		//   })
		//   this.$destroy();
		// } else {
		//     this.userInfo.username = window.sessionStorage.userName
		// }
		// this.getAllOrg()
	},
	mounted() {
		this.orgTree = this.$store.state.orgTree;
	},
	beforeDestroy() {
	
	},
	updated() {
		console.log('welcome页面刷新了')
	},
	methods: {
		testaaa(){
			mgr.signinRedirectCallback().then((data)=>{
				console.log('callback的data',data)
			})
		},
		exitAll() {
			window.sessionStorage.clear()
			location.reload()
		},
		getAllOrg() {
			// AllOrgs().then((data)=>{
			//   let index;
			//
			//   // for(index in data){
			//   //   if(data[index].pId in this.orgTree){
			//   //     console.log(data[index])
			//   //   }else{
			//   //     console.log('false')
			//   //   }
			//   //   this.orgTree.push({[data[index].id]:{children:[]},label:data[index].name})
			//   // }
			//   console.log(this.orgTree)
			// })
		},
		handleNodeClick(orgTree) {
			if (this.$route.query.pId != orgTree.id) {
				console.log('thisClick:' + orgTree.id)
				
				this.$router.push({path: '/Welcome/Files', query: {pId: orgTree.id, pName: orgTree.label}});
				
			}
			// if (this.$router.path=='/Welcome/SelfLibrary/Files'){
			// this.$router.push({path:'/Welcome/selflibrary'})
			
			// }
			//页面刷新
			// console.log(orgTree)
		}
	}
}
</script>

<style lang="less" scoped>
@import "../assets/css/Global";

.root {
	height: 100%;
}

.el-header {
	background-color: @background_color0;
	border-bottom: 2px solid @line_color1;
	border-radius: 5px;
	
	.el-row {
		line-height: 60px;
	}
	
	.el-col:nth-child(1) {
		color: white;
		
		img {
			padding-top: 6px;
			padding-bottom: 6px;
			width: 144px;
			height: 48px;
		}
	}
	
	.el-col:nth-child(2) {
		text-align: right;
		
		.self {
			margin-right: 10px;
			
			> img {
				margin-right: 10px;
				vertical-align: middle;
				height: 30px;
				border-radius: 50%;
			}
			
			> i {
				margin-right: 10px;
				display: inline;
				vertical-align: middle;
			}
		}
	}
}

.el-aside {
	background: @background_color0;
	border-radius: 5px;
	border: 1px solid @line_color2;
	box-sizing: content-box;
	
	.el-menu {
		//height: 100%;
		border: 0;
	}
}

.main-inside {
	border: 1.5px solid #e6e6e6;
	border-radius: 5px;
	box-sizing: border-box;
}


/deep/ .el-tree-node__content {
	height: 56px !important;
	color: #303133;
}

/deep/ .is-current:hover {
	background-color: #ecf5ff;
	
	//>.el-tree-node__content{
	//  color: #409EFF;
	//}
}

</style>
