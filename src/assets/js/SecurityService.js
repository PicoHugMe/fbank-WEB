import Oidc from 'oidc-client';
export const mgr= new Oidc.UserManager({
		authority:'https://localhost:44317/',
		client_id:'Server_Vue',
		redirect_uri:'http://localhost:8080/Welcome',
		response_type:'code',
		userStore:new Oidc.WebStorageStateStore({store:window.sessionStorage}),
		scope:'email openid profile role phone address Server',
		automaticSilentRenew:true,
		filterProtocolClaims:true,
		loadUserInfo:true
})
