<template>
	<el-form :rules="rules" :model="login" ref="login">
		<el-form-item prop="name">
			<el-input
				placeholder="请输入注册邮箱"
				prefix-icon="el-icon-user-solid"
				v-model="login.name"
				maxlength="255"
			></el-input>
		</el-form-item>
		<el-form-item prop="pwd">
			<el-input
				placeholder="请输入注册密码"
				prefix-icon="el-icon-lock"
				v-model="login.pwd"
				maxlength="32"
				show-word-limit
			></el-input>
			<!--			<el-input-->
			<!--				placeholder="确认密码"-->
			<!--				prefix-icon="el-icon-lock"-->
			<!--				v-model="pwd2"-->
			<!--				maxlength="32"-->
			<!--				show-word-limit-->
			<!--			></el-input>-->
		</el-form-item>
		<!--		<el-form-item label="性别" prop="sex">-->
		<!--			<el-radio-group label-position="left" v-model="login.sex">-->
		<!--				<el-radio label="0">男</el-radio>-->
		<!--				<el-radio label="1">女</el-radio>-->
		<!--				<el-radio label="2">保密</el-radio>-->
		<!--			</el-radio-group>-->
		<!--		</el-form-item>-->
		<el-button type="primary" @click="logIn('login')" v-loading="loading">{{ loginStr }}</el-button>
	</el-form>
</template>

<script>
import {requestSignUp} from '@/assets/js/api'
export default {
	name: "Signup",
	data() {
		return {
			login: {
				name: 'testname@123.com',
				pwd: 'testpwdA2$',
				// sex: 2,
			},
			// pwd2: '',
			loginStr: '注册',
			loading: false,
			rules: {
				name: [
					{required: true, message: '请输入注册邮箱', trigger: 'blur'},
					{min: 5, max: 255, message: '邮箱长度在5到255个字符', trigger: 'blue'},
					{
						pattern: '^[a-zA-Z0-9\\-\\_]*\\@[a-zA-Z0-9]*\\.[a-zA-Z0-9]*.*[^._^-]$',
						message: '请输入正确的邮箱地址',
						trigger: 'blur'
					}
				],
				pwd: [
					{required: true, message: '请输入注册密码', trigger: 'blur'},
					{min: 6, max: 32, message: '密码长度需在6到32字符', trigger: 'blue'},
					{
						// pattern: '^[a-zA-Z0-9\\&\\!\\@\\#\\$\\%\\*\\,\\<\\.\\>\\?\\;\\:\\"\\[\\{\\-\\_\\=\\+\\`\\~]*$',
            pattern: '^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*.?])[\\da-zA-Z~!@#$%^&*.?]{8,}$',
						message: '密码需使用字母加数字加特殊字符组合',
						trigger: 'blur'
					},
				],
				// sex: [
				// 	{required: true, message: '请选择性别', trigger: 'change'}
				// ]
			}
		}
	},
	methods: {
		logIn(login) {
			let _this = this;
			this.$refs[login].validate((valid) => {
				if (valid) {
					const loginParams = {
						email: this.login.name,
						password: this.login.pwd,
					}
					this.loading = true;
					this.$message('正在注册');
					_this.loginStr = '正在注册';
					
					requestSignUp(loginParams).then(() => {
							setTimeout(function () {
								_this.$message({
									message: '注册成功，跳转至登录页面。',
									type: 'success'
								})
								setTimeout(function () {
									_this.$router.push({path: '/logins/login/signin'})
								}, 500)
							}, 2500)
					}).catch((e) => {
            console.log('e:', e.response.data.errors[0])
						_this.$alert('该用户已存在', '错误', {
							confirmButtonText: '确定'
						})
						_this.loading = false;
						_this.loginStr = "重新注册";
					})
				}
			})
		}
	},
	mounted() {
	}
}
</script>

<style scoped lang="less">
@import "../../assets/css/Global";

.el-form {
	padding-left: 30px;
	padding-right: 30px;
	margin-top: 40px;
}

.el-form-item:nth-child(2) {
	.el-input:nth-child(1) {
		margin-bottom: 22px;
	}
}

.el-button {
	width: 100%;
}
</style>