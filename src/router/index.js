import Vue from 'vue'
import Router from 'vue-router'

import CheckLogined from "@/components/logins/CheckLogined";

import Welcome from "../components/Welcome";


import SelfLibrary from "../components/selflibrary/SelfLibrary";
import Files from "../components/selflibrary/Files";
import Developing from "@/components/Developing";
// import Recently from "@/components/selflibrary/Recently";
// import RecentFive from "../components/selflibrary/RecentFive";

// import Organization from "../components/organization/Organization";
import OrgFiles from "../components/organization/Files"

import SelfCenter from "@/components/selfCenter/SelfCenter";
import SelfInfo from "@/components/selfCenter/SelfInfo";

Vue.use(Router)

const router = new Router({
		mode: 'history',
		// base:process.env.BASE_URL,
		routes: [
				{
						path: '/',
						component:CheckLogined
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
							{
								path: 'Files',
								component: OrgFiles,
								meta: {
									title: '我的组织'
								}
							},
								{
										path:'SelfCenter',
										component:SelfCenter,
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
