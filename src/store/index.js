import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

//actions响应组件中用户的动作
const actions = {}
//mutations修改state中的数据
const mutations = {
		addLoginInfo(state, value) {
				state.loginInfo.isSuccessed = value.isSuccessed;
				state.loginInfo.tokenStr = value.tokenStr;
		},
		addUserInfo(state, value) {
				state.userInfo.email = value.email;
				state.userInfo.sex = value.sex;
				state.userInfo.userName = value.userName;
		}
}
//state保存具体的数据
const state = {
		loginInfo: {
				isSuccessed: false,
				tokenStr: ''
		},
		userInfo: {
				email: '',
				sex: 2,
				userName: '用户名'
		},
		nowPath: '/'


}

//创建并暴露store
export default new Vuex.Store({
		actions,
		mutations,
		state
})