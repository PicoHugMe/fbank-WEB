<template>
	<el-tabs :tab-position="tabPosition" style="background-color:white;height: 100%;">
		<el-tab-pane label="个人信息">
			<div class="showPanel">
<!--				<div class="panelName">个人信息</div>-->
				<el-form ref="selfInfo_form" :model="selfInfo_form" label-width="80px" size="medium">
					<el-form-item label="头像">
						<el-avatar :size="50" :src="selfInfo_form.user_logo"></el-avatar>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input v-model="selfInfo_form.username">{{selfInfo_form.username}}</el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-input v-model="selfInfo_form.username">{{selfInfo_form.sex}}</el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="selfInfo_form.email">{{selfInfo_form.email}}</el-input>
						<el-button v-model="selfInfo_form.email_verify">{{selfInfo_form.email_verify}}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-tab-pane>
		<el-tab-pane label="密码修改">
			<div class="showPanel">
				<el-form :model="ruleFormPwd" :rules="rules" ref="ruleFormPwd">
					<el-form-item label="密码" prop="pass">
						<el-input type="text" v-model="ruleFormPwd.pass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="text" v-model="ruleFormPwd.checkPass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitChangePassword('ruleFormPwd')">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-tab-pane>
		<el-tab-pane label="邮件通知"></el-tab-pane>
		<el-tab-pane label="两步验证"></el-tab-pane>
		<el-tab-pane label="注销账号">
			<div class="showPanel">
				<el-result icon="warning" title="注销账号" subTitle="账号一经注销，不可恢复。">
					<template slot="extra">
						<el-button type="danger" size="medium" @click="deleteAccount()">确认注销</el-button>
					</template>
				</el-result>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
export default {
	name: "SelfCenter",
	data(){
		var validatePass=(rule,value,callback)=>{
			if(value===''){
				callback(new Error('请输入密码'));
			}else{
				if (this.ruleFormPwd.checkPass!==''){
					this.$refs.ruleFormPwd.validateField('chechPass');
				}
				callback();
			}
		};
		var validatePass2=(rule,value,callback)=>{
			if(value===''){
				callback(new Error('请再次输入密码'));
			}else if(value!=this.ruleFormPwd.pass){
				callback(new Error('两次输入密码不一致！'));
			}else{
				callback();
			}
		};
		return{
			tabPosition:'left',
			selfInfo_form: {
				user_logo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				username:'用户名',
				sex:'未知',
				email:'',
				email_verify:'验证邮箱',
				sub:''
			},
			ruleFormPwd:{
				pass:'',
				checkPass:'',
			},
			rules:{
				pass:[{validator:validatePass,trigger:'blur'}],
				checkPass:[{validator:validatePass2,trigger:'blur'}]
			},
			
			
		}
	},
	mounted() {
		const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
		const tempTextmore=tempText.profile;
		this.selfInfo_form.username=tempText.name;
		// this.selfInfo_form.sex=tempText.sex;
		this.selfInfo_form.email=tempText.email;
		this.selfInfo_form.email_verify=tempText.email_verified;
		this.selfInfo_form.sub=tempText.sub;
	},
	methods:{
		submitChangePassword(formName){
			this.$refs[formName].validate((valid)=>{
				if (valid){
					//此处提交修改密码的请求
					alert('提交')
				}else {
					console.log('error submit');
					return false;
				}
			});
		},
		deleteAccount(){
			this.$alert('请联系管理员','高危操作',{
				confirmButtonText:'返回',
				callback:action => {
					this.$message({
						type:'info',
						message:'操作取消。'
					});
				}
			});
		}
	}
}
</script>

<style scoped lang="less">
.showPanel{
	margin: 0 auto;
	margin-top: 30px;
	width:460px ;
	.panelName{
		font-size: 1.3rem;
		font-weight: 800;
	}
}
</style>
