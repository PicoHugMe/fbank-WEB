<!--展示总的组织文件-->
<template>
	<el-container>
		<el-dialog
			title="创建组织"
			:visible="createOrgVisible"
			center
			width="30%"
		>
			<div>
				<el-input placeholder="请输入组织名称" v-model="newOrgName"></el-input>
			</div>
			<div class="dialog-footer">
				<el-button type="primary" @click="this.addOrg">确 定</el-button>
				<el-button @click="createOrgVisible = false;newOrgName=''">取 消</el-button>
			</div>
		</el-dialog>
		<el-header>
			<el-button size="normal" type="primary" @click="createOrgVisible=true">创建组织</el-button>
			<el-button size="normal" >加入组织</el-button>
			<!--			<el-button size="danger" >退出当前组织</el-button>-->
			<!--			<el-button size="danger" >删除当前组织</el-button>-->
		</el-header>
		<el-main>
			<el-card shadow="hover" v-for="(item,index) in tableData" :key="index">
				<p class="orgName">{{ item.orgName }}</p>
				<p class="whoMake">由 {{ item.whoMake }} 创建</p>
			</el-card>
		</el-main>
		<el-footer>
			<router-view goPath="101ac5fb-9b8b-4886-b81d-48bac0f768d2"></router-view>
		</el-footer>
	</el-container>
</template>

<script>
import {} from "../../assets/js/api"

export default {
	name: "Organization",
	data() {
		return {
			tableData: [
				{
					orgName: '组织1',
					whoMake: '自己',
				},
				{
					orgName: '组织2',
					whoMake: '赵加威',
				},
				{
					orgName: '组织3',
					whoMake: '自己',
				},
				{
					orgName: '组织4',
					whoMake: '赵加威',
				},
				{
					orgName: '组织5',
					whoMake: '自己',
				}
			],
			createOrgVisible: false,
			newOrgName:'',
			
		}
	},
	mounted() {
		// alert("cccc")
	},
	methods:{
		addOrg(){
			alert('addorg')
		}
	}
}

</script>

<style scoped lang="less">
@import "../../assets/css/Global";

.el-container {
	box-sizing: border-box;
	//border: 1.5px solid @line_color2;
	border-radius: 5px;
	height: 100%;
	background-color: #fff;

	.dialog-footer{
		text-align: center;
		margin-top: 25px;
	}
	
	.el-header {
		padding: 20px 40px;
		
		.el-button {
			margin-right: 20px;
		}
	}

	.el-main{
		//flex: 0 !important;
	}
	
	.el-footer{
		height: auto !important;
		margin: 0 20px;
		padding: 0;
	}
	.el-main{
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
