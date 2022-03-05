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

router.beforeEach((to, from, next) => {
//		路由发生变化修改页面标题title
		if (to.meta.title) {
				document.title = to.meta.title
		}
		next()
})

new Vue({
		router,
		store,
		render: h => h(App),
}).$mount('#app')


