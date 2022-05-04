import Vue from 'vue'
import App from './App.vue'

//引入全局less
import 'less-loader'

//引入路由router
import router from './router/index'
Vue.use(router)

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//引入vuex
import store from './store'

//关闭开发注释
Vue.config.productionTip = false

// import mgr from '@/assets/js/SecurityService'

// router.beforeEach(async (to, from, next) => {
//
// //路由发生变化修改页面标题title
// 		if (to.meta.title) {
// 				document.title = to.meta.title
// 		}
// 		next()
// 		// console.log('页面刷新了')
// // if (window.localStorage.getItem())
// //路由发生变化判断是否登录
// // 		mgr.signinRedirect().then((data)=>{
// // 				console.log('data::::',data)
// // 		})
// // mgr.getSignedIn().then((data)=>{
// // 		console.log('data:',data)
// // })
// // if (mgr.getSignedIn().then()) {
// // 		next()
// // }else {
// // 		mgr.signIn();
// // }
// // if (user){
// // 		console.log('拿到了user',user)
// //
// // }else{
// // 		mgr.signinRedirect().then(()=>{
// // 				console.log('开始登录')
// // 		}).catch(error=>{
// // 				console.error(error)
// // 		})
// // }
// })

new Vue({
		router,
		store,
		render: h => h(App),
}).$mount('#app')


