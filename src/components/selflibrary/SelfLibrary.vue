<template>
	<el-container>
		
		<el-aside width="150px">
			<el-menu
				router
				:default-active="$route.path"
				mode="vertical"
			>
				<el-menu-item index="/Welcome/SelfLibrary/Files">
					<i class="el-icon-files"></i>
					<span slot="title">全部文件</span>
				</el-menu-item>
				<el-menu-item index="/Welcome/SelfLibrary/Recently">
					<i class="el-icon-finished"></i>
					<span slot="title">最近</span>
				</el-menu-item>
				<el-menu-item index="3">
					<i class="el-icon-collection"></i>
					<span slot="title">收藏</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-collection"></i>
					<span slot="title">共享</span>
				</el-menu-item>
				<el-menu-item index="5">
					<i class="el-icon-collection-tag"></i>
					<span slot="title">标签</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: "SelfLibrary"
}
</script>

<style scoped lang="less">
@import "../../assets/css/Global";

.el-container {
	box-sizing: border-box;
	//border: 1.5px solid @line_color2;
	//border-radius: 5px;
	height: 100%;
	background-color: #fff;
}

.el-aside {
	height: 100%;
	border-right: 1px solid @line_color2;
	
	> ul {
		border-right: 0;
	}
}

.el-main {
	//padding: 0;
}
</style>
