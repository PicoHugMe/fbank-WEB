<template>
	<el-container class="root">
		<el-header>
			<el-row>
				<el-col :span="12">
					<img alt="" src="../assets/pic/chang_clear_noword_256.png"/>
				</el-col>
				<el-col :span="12">
					<div class="notify"></div>
					<div class="self">
						<img
							alt="用户头像"
							:src=userInfo.user_logo
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
				<el-tree :data="orgTree" @node-click="handleNodeClick" node-key="id" highlight-current :default-expanded-keys=orgTreeExpended></el-tree>
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
import {mgr} from "@/assets/js/SecurityService";
import {delCookie} from "@/assets/js/Global";
import {AllOrgs, getUserLogo} from "@/assets/js/api";

export default {
	data() {
		return {
			backInfo: '',
			userInfo: {
				username: '',
				sex: 2,
				email: '',
				email_verify: '',
				sub: '',
				user_logo:'../assets/pic/chang_clear_noword_256.png'
			},
			orgTree: [
				{
					label: '个人',
					disabled: true,
					id: '999999999',
					children: [
						{
							label: '私人知识库',
							id: 'selfLibrary'
						},
						{
							label: '个人中心',
							id:'selfControlCenter'
						}]
				},
				{
					label: '我的组织',
					id: '888888888',
					children: [
						{
							label: '啥',
							id: 'csdsd'
						}
					]
				},
				{
					label: '通讯录',
					id: '777777777'
				},
				{
					id: '666666666', label: '通知'
				},
				{
					id: '444444444',
					label: '邮件服务'
				},
				{
					label: '待办事项',
					id: '333333333'
				},
				{
					label: '企业服务',
					id: '222222222'
				}
				
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
				// }
			],
			orgTreeExpended: ['999999999']
		}
	},
	created() {
		const loadingin = this.$loading({
			lock: true,
			text: '正在匹配登录信息',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});
	},
	mounted() {
		this.checkIfLogin();
	},
	beforeDestroy() {
	
	},
	updated() {
	},
	methods: {
		//验证是否登录
		async checkIfLogin() {
			await mgr.signinRedirectCallback().then((data) => {
				if (this.$route.path=='/Welcome'){
					this.$router.push('/Welcome/SelfLibrary/Files')
				}
				console.log('datais', data)
				this.getUserInfo();
				this.getAllOrg();
				this.$loading().close();
				
			}).catch(() => {
				window.sessionStorage.clear()
				delCookie();
				this.$router.push('/')
			})
		},
		//从token获取用户信息
		getUserInfo() {
			const tempInfo = eval('(' + window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue') + ')').profile;
			this.userInfo.username = tempInfo.name;
			this.userInfo.email = tempInfo.email;
			this.userInfo.sub = tempInfo.sub;
			getUserLogo().then((data)=>{
				console.log('this is getUserLogo:',data)
			}).catch((error)=>{
				if (error.response.data=='用户头像不存在！'){
					this.userInfo.user_logo='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
				}
			})
			// console.log('this is tempinfo', tempInfo)
		},
		//退出登录
		exitAll() {
			mgr.signoutRedirect();
			window.sessionStorage.clear()
			location.reload()
		},
		
		
		getAllOrg() {
			AllOrgs().then((data)=>{
				console.log('this is org:',data)
			})
		},
		handleNodeClick(orgTree) {
			switch (orgTree.id) {
				case 'selfLibrary':
					if(this.$route.path!='/Welcome/SelfLibrary/Files'){
						this.$router.push({path: '/Welcome/SelfLibrary/Files'});
					}
					break;
				case '999999999':
					break;
				case 'selfControlCenter':
					if (this.$route.path!='/Welcome/SelfCenter'){
						this.$router.push({path:'/Welcome/SelfCenter'});
					}
					break;
				default:
					// this.$route.query.pId != orgTree.id
					console.log('thisClick:' + orgTree.id)
					this.$router.push({path: '/Welcome/Files', query: {pId: orgTree.id, pName: orgTree.label}});
					break;
			}
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
