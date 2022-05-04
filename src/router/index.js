import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/logins/Login";
import Signup from "../components/logins/Signup";
import Signin from "../components/logins/Signin";



import Welcome from "../components/Welcome";


import SelfLibrary from "../components/selflibrary/SelfLibrary";
import Files from "../components/selflibrary/Files";
import Developing from "@/components/Developing";
// import Recently from "@/components/selflibrary/Recently";
// import RecentFive from "../components/selflibrary/RecentFive";

// import Organization from "../components/organization/Organization";
import OrgFiles from "../components/organization/Files"

Vue.use(Router)

const router = new Router({
		mode: 'history',
		// base:process.env.BASE_URL,
		routes: [
				{
						path: '/',
						// redirect: '/logins/login/signin'
				},
				{
						path: '/logins/login',
						component: Login,
						redirect: '/logins/login/signin',
						children: [
								{
										path: 'Signin',
										component: Signin,
										meta: {
												title: '登入 - FBank'
										},
								},
								{
										path: 'Signup',
										component: Signup,
										meta: {
												title: '登入 - FBank'
										},

								}
						]
				},
				{
						path: '/Welcome',
						component: Welcome,
						meta: {
								title: '个人中心'
						},
						children: [
								{
										path: 'SelfLibrary',
										component: SelfLibrary,
										meta: {
												title: '私人知识库'
										},
										children: [
												{
														path: 'Files',
														component: Files,
												},
												{
														path:'Developing',
														component:Developing,
												},
										]
								},
								// {
								// 		path: 'Organization',
								// 		component: Organization,
								// 		meta: {
								// 				title: '我的组织'
								// 		},
								// 		children:[
								// 				{
								// 						path: 'Files',
								// 						component: OrgFiles,
								// 						meta:{
								// 								title:'我的组织'
								// 						}
								// 				}
								// 		]
								//
								// }
							{
								path: 'Files',
								component: OrgFiles,
								meta: {
									title: '我的组织'
								}
							}
						]
				},
		],
		// proxyTable:{
		// 		'/api/**':{
		// 				target:'https://zzxfkme.icu:5001'
		// 		}
		// }
});
export default router;
