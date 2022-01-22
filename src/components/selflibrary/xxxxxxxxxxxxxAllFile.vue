<template>
	<el-container>
		
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>

</template>

<script>
export default {
	name: "Allfile",
	data() {
		return {
			fileList: []
		}
	},
	methods: {
		uploadProgress() {
			this.$notify.info({
				title: '文件上传消息',
				message: '文件上传中...'
			});
		},
		// isOK(res) {
		// 	this.$notify({
		// 		title: '文件上传消息',
		// 		message: '文件上传成功！',
		// 		type: 'success'
		// 	})
		// 	// console.log(res)
		// 	console.log(res.message);
		// }
	}
}
</script>

<style scoped lang="less">
@import "../../assets/css/Global";


.el-main {
	padding-bottom: 0;
}


</style>