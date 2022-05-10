<template>
	<el-container>
	</el-container>
</template>

<script>
import {mgr} from "@/assets/js/SecurityService";
export default {
	name: "CheckLogined",
	data(){
		return{
			fullscreenLoading:true
		}
	},
	mounted() {
		const loading = this.$loading({
			lock: true,
			text: '正在加载登录信息',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});
		this.checkIfLogin();
	},
	methods:{
		async checkIfLogin(){
			await mgr.getUser().then((data)=>{
				if (data==null){
					mgr.signinRedirect();
				}else{
					this.$router.push('/Welcome')
				}
			})
		}
	},
	created() {
		console.log('created页面刷新了')
	}
}
</script>

<style scoped>

</style>
