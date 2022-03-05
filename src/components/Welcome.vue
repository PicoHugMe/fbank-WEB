<template>
	<el-container class="root">
		<el-header>
			<el-row>
				<el-col :span="12">
					<img src="../assets/pic/chang_clear_noword_256.png" alt=""/>
				</el-col>
				<el-col :span="12">
					<div class="notify"></div>
					<div class="self">
						<img
							src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
							alt="用户头像"
						/>
						<span>{{ userInfo.username }}&ensp;</span>
						<i class="el-icon-arrow-down"></i>
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
					<el-submenu index="1-1">
						<template slot="title">
							<i class="el-icon-s-home"></i>
							<span>个人中心</span>
						</template>
						<el-menu-item-group>
							<!--							<template slot="title"></template>-->
							<el-menu-item index="1-1">我的</el-menu-item>
							<el-menu-item index="/Welcome/SelfLibrary/Files">私人知识库</el-menu-item>
							
							<el-menu-item index="1-3">待办事项</el-menu-item>
							<el-menu-item index="1-4">企业服务</el-menu-item>
							<!--							<el-menu-item index="1-5" ><router-link to="/logins/login/signin" replace>登录</router-link></el-menu-item>-->
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-s-comment"></i>
							<span>站内通讯</span>
						</template>
						<el-menu-item-group>
							<!--							<template slot="title"></template>-->
							<el-menu-item index="2-1">私聊</el-menu-item>
							<el-menu-item index="2-2">通知</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="3">
						<span slot="title">通讯录</span>
					</el-menu-item>
					<el-menu-item index="/Welcome/Organization/Files">我的组织</el-menu-item>
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
			</el-aside>
			<el-container>
				<el-main>
					<div style="height: 100%" class="main-inside">
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

export default {
	data() {
		return {
			userInfo: {
				username: '',
				sex: 2,
				email: ''
			}
		}
	},
	created() {
		if (!window.localStorage.success) {
			this.$router.push({path: '/logins/login/signin'});
			this.$message({
				type: 'error',
				message: '非法访问！'
			})
			this.$destroy();
		} else {
			if (this.$store.state.loginInfo.success) {
				this.userInfo.username=this.$store.state.userInfo.userName
				// const saveMessage = {
				// 	access_token: this.$store.state.loginInfo.access_token,
				// 	success: this.$store.state.loginInfo.success
				// }
				// this.$store.commit('addLoginInfo', saveMessage)
				// const userToken = this.$store.state.loginInfo.token_type+' '+ this.$store.state.loginInfo.access_token;
				// getUserInfo(userToken).then((data) => {
				// 	if (data.success) {
				// 		data = data.response;
				// 		window.localStorage.userInfo_email = data.email;
				// 		window.localStorage.userInfo_sex = data.sex;
				// 		window.localStorage.userInfo_userName = data.userName;
				// 		this.$store.commit('addUserInfo', {email: data.email, sex: data.sex, userName: data.userName});
				// 		this.userInfo.username = this.$store.state.userInfo.userName;
				// 	}
				// 	console.log('data:', data);
				// })
			}
		}
	},
	mounted() {
		// console.log('Welcome\'s this:', this)
	},
	beforeDestroy() {
		// console.log('welcome destore');
	},
	methods: {}
}
</script>

<style scoped lang="less">
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
		height: 100%;
		border: 0;
	}
}

.main-inside{
	border: 1.5px solid #e6e6e6;
	border-radius: 5px;
	box-sizing: border-box;
}
</style>
