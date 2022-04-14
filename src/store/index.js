import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

//actions响应组件中用户的动作
const actions = {}
//mutations修改state中的数据
const mutations = {
    addLoginInfo(state, value) {
        state.loginInfo.success = value.success;
        state.loginInfo.access_token = value.access_token;
        state.loginInfo.expires_in = value.expires_in;

    },
    addUserInfo(state, value) {
        state.userInfo.email = value.email;
        state.userInfo.sex = value.sex;
        state.userInfo.userName = value.userName;
        state.userInfo.userId = value.userId;
    },
    updateNowOrgPath(state, value) {
        state.nowOrgPath = value.nowOrgPath;
    },
    changeOrg(state,value){
        state.orgTree=value.orgTree;
    }
    // addOrgTree(state,value){
    //     console.log(value)
    //     state.OrgTree.pop(value)
    // }
}
//state保存具体的数据
const state = {
    loginInfo: {
        success: false,
        access_token: '',
        expires_in: ''
    },
    userInfo: {
        email: '',
        sex: 2,
        userName: '用户名',
        userId: ''
    },
    nowOrgPath: '/',
    orgTree: [
        {
            label:'技术部门',
            id:'c4ed38a2-3e10-415e-adf4-1c140cc74fa3',
            children:[{
                label: '产品设计部门',
                id:'b94892ed-a71e-491c-a674-71303eebc073',
            },{
                label: '界面设计部门',
                id:'d53d614c-d73e-4ad8-be8d-acf841e0ad32',
                children:[{
                    label:'后台界面设计',
                    id:'csdsd'
                }]
            },{
                label: '交互设计部门',
                id:'d53d614c-d73e-4ad8-be8d-acf841e0ad32',
            },]
        },{
            label: '前端开发部门',
            id:'06f2cc3c-db18-4d7b-a8cf-076abbb16648',
        },{
            label: '后端开发部门',
            id:'06f2cc3c-db18-4d7b-a8cf-076abbb16648',
        }
    ],
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
