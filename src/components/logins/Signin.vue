<template>
	<el-form :rules="rules" :model="login" ref="login">
		<el-form-item prop="name">
			<el-input
				placeholder="请输入登录邮箱"
				prefix-icon="el-icon-user-solid"
				v-model="login.name"
				maxlength="255"
			></el-input>
		</el-form-item>
		<el-form-item prop="pwd">
			<el-input
				placeholder="请输入登录密码"
				prefix-icon="el-icon-lock"
				v-model="login.pwd"
				maxlength="32"
				show-password
			></el-input>
		</el-form-item>
		<el-button type="primary" @click="logIn('login')" v-loading="loading">{{ loginStr }}</el-button>
	</el-form>

</template>

<script>
import {requestSignIn} from "@/assets/js/api";
import mgr from "@/assets/js/SecurityService";

export default {
	name: "Signin",
	data() {
		return {
			login: {
				name: 'testname@123.com',
				pwd: 'testpwdA2$'
			},
			loginStr: '登录',
			loading: false,
			rules: {
				name: [
					{required: true, message: '请输入登录邮箱', trigger: 'blur'},
					{min: 5, max: 255, message: '邮箱长度在5到255个字符', trigger: 'blue'},
					{
						pattern: '^[a-zA-Z0-9\\-\\_]*\\@[a-zA-Z0-9]*\\.[a-zA-Z0-9]*.*[^._^-]$',
						message: '请输入正确的邮箱地址',
						trigger: 'blur'
					}
				],
				pwd: [
					{required: true, message: '请输入登录密码', trigger: 'blur'},
					{min: 6, max: 32, message: '密码长度为6到32位字符', trigger: 'blue'},
				]
			}
		}
	},
	methods: {
		logIn(login) {
		mgr.signinRedirect();
		// 	let _this = this;
		// 	//检验表单数据是否符合规范
		// 	this.$refs[login].validate((valid) => {
		// 		if (valid) {
		// 			const loginParams = {
		// 				email: this.login.name,
		// 				password: this.login.pwd
		// 			}
		// 			this.loading = true;
		// 			this.$message('正在登录');
		// 			_this.loginStr = '正在登录';
		//
		// 			requestSignIn(loginParams).then((data) => {
		// 				console.log('data:', data);
		// 				const saveMessage = {
		// 					access_token: data.tokenType+' '+data.accessToken,
		// 					expires_in: data.expires,
		// 					success:data.success
		// 				}
		// 				sessionStorage.setItem('expires_in',saveMessage.expires_in)
    //         sessionStorage.setItem('success',saveMessage.success)
    //         sessionStorage.setItem('access_token',saveMessage.access_token)
		//
		// 				const strings=saveMessage.access_token.split(".");
		//
		// 				const tempUserId=JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g,"+").replace(/_/g,"/")))))['sub'];
		// 				const userInfo={
		// 					email: loginParams.email,
		// 					sex:2,
		// 					userName:loginParams.email,
		// 					userId:tempUserId
		// 				}
    //         sessionStorage.setItem('email',loginParams.email)
    //         sessionStorage.setItem('sex',2)
    //         sessionStorage.setItem('userName',loginParams.email)
    //         sessionStorage.setItem('userId',tempUserId)
		//
    //         this.$store.commit('addUserInfo',userInfo);
		// 				// alert(this.$store.state.userInfo.userId);
		// 				this.$store.commit('addLoginInfo', saveMessage)
		// 				setTimeout(function () {
		// 					_this.$message({
		// 						message: '登录成功，正在跳转。',
		// 						type: 'success'
		// 					})
		// 					setTimeout(function () {
		// 						_this.$router.push({path: '/Welcome/SelfLibrary/Files'})
		// 					}, 200)
		// 				}, 800)
		// 			}).catch((e) => {
		// 				_this.$alert(e.response.data[0], '错误', {confirmButtonText: '确定'})
		// 				_this.loading = false;
		// 				_this.loginStr = "重新登录";
		// 			})
		// 		}
		// 	});
		}
	},
}
</script>

<style scoped lang="less">
@import "../../assets/css/Global";

.el-form {
	padding-left: 30px;
	padding-right: 30px;
	margin-top: 40px*2;
}

.el-button {
	width: 100%;
}
</style>
