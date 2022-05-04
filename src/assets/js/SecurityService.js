import Oidc from 'oidc-client';
export default new Oidc.UserManager({
		authority:'https://localhost:44317/',
		client_id:'Server_Vue',
		redirect_uri:'http://localhost:8080/Welcome',
		response_type:'code',
		userStore:new Oidc.WebStorageStateStore({store:window.localStorage}),
		scope:'email openid profile role phone address Server',
		automaticSilentRenew:true
})

// export default class SecurityService {
// 		getSignedIn () {
// 				let self = this
// 				return new Promise((resolve, reject) => {
// 								mgr.getUser().then(function (user) {
// 										console.log('此刻开始输出user',user)
// 										if (user == null) {
// 												self.signIn()
// 												return resolve(false)
// 										} else{
// 												return resolve(true)
// 										}
// 								})
// 				})
// 		}
// 		signIn () {
// 				mgr.signinRedirect()
// 				// mgr.signinRedirect().then(()=>{
// 				// 		mgr.signinRedirectCallback().then((data)=>{
// 				// 				console.log('data',data)
// 				// 		})
// 				// }).catch(function (err) {
// 				// 		console.log('err',err)
// 				// })
// 		}
//
//
// }
