<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	data(){
		return{
			// mgr:new Mgr(),
			signedIn:true
		}
	},
	components: {},
	mounted() {
		// this.mgr.getSignedIn().then(
		// 	signIn => {
		// 		this.signedIn = signIn
		// 	},
		// 	err => {
		// 		console.log(err)
		// 	}
		// )
	},
	updated() {
		// console.log('app页面刷新了')
	}
	// created() {
  //   if(sessionStorage.getItem())
  // }
}
</script>

<style lang="less">




* {
	padding: 0;
	margin: 0;

}
#app {
  background: @background_color1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@import "./assets/css/Global";
</style>
