<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: 'App',
	components: {},
	mounted() {
		// console.log('store',this)
	}
}
</script>

<style lang="less">
@import "./assets/css/Global";

#app {
	background: @background_color1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

* {
	padding: 0;
	margin: 0;
	
}
</style>
