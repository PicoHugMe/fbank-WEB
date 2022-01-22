import axios from 'axios'

//端口url
let base = 'http://localhost:8080'

//请求延时
// axios.defaults.timeout=10000;

export const requestSignIn = (params) => {
		return axios.post(`${base}/auth/login`, {email: params.email, password: params.password}).then(res => res.data);
}
export const requestSignUp = (params) => {
		return axios.post(`${base}/auth/register`, {email: params.email, password: params.password}).then(res => res.data);
}

export const getUserInfo = (userToken) => {
		return axios.get(`${base}/api/user`, {params: {}, headers: {'Authorization': userToken}}).then(res => res.data);
}

export const getPathFiles = (pathInfo) => {
		return axios.get(`${base}/api/privatespace`, {
				params: {
						DirId: pathInfo.DirId,
						PageIndex: pathInfo.PageIndex,
						PageSize: pathInfo.PageSize
				}
		}).then(res => res.data);
}

export const getRecentPathFiles = (pathInfo) => {
		return axios.get(`${base}/api/privatespace/Recent`, {
				params: {
						PageIndex: pathInfo.PageIndex,
						PageSize: pathInfo.PageSize
				}
		}).then(res => res.data);
}

export const deleteFile = (Id) => {
		return axios.delete(`${base}/api/privatespace`, {
				params: {
						Id
				}
		}).then(res => res.data);
}

export const newFolder =(pDirId,dirName)=>{
		return axios.post(`${base}/api/privatespace`,{
						pDirId,dirName
		}).then(res=>res.data)
}

export const renameFFs=(Id,newName)=>{
		return axios.put(`${base}/api/privatespace`,{
				id:Id,
				name:newName,
				description:'string'
		})
}