import axios from 'axios'


//端口url
let base = 'https://localhost:44386'

//请求延时
// axios.defaults.timeout=10000;

//登录
export const requestSignIn = (params) => {
    return axios.post(`${base}/api/auth/login`, {
        loginName: params.email,
        password: params.password
    }).then(res => res.data);
}
//注册
export const requestSignUp = (params) => {
    return axios.post(`${base}/api/auth/register`, {
        email: params.email,
        password: params.password
    }).then(res => res.data);
}
//获取用户基本信息-Welcome页面banner
export const getUserInfo = (userToken) => {
    return axios.get(`${base}/api/user`, {params: {}, headers: {'Authorization': userToken}}).then(res => res.data);
}
//获取当前路径下的所有文件信息
export const getPathFiles = (pathInfo) => {
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    return axios.get(`${base}/api/private/files`, {
        params: {
            //文件夹id
            pDirId: pathInfo.DirId,
            //当前页数，从0开始
            SkipCount: pathInfo.PageIndex-1,
            //一页几个
            MaxResultCount:pathInfo.pageSize,
            //排序方式
            Sorting: pathInfo.sorting
        },
        headers: {
            'Authorization': authorization_text,
        }
    }).then(res => res.data);
}
//获取最近修改的文件
export const getRecentPathFiles = (pathInfo) => {
    return axios.get(`${base}/api/privatespace/Recent`, {
        params: {
            PageIndex: pathInfo.PageIndex,
            PageSize: pathInfo.PageSize
        }
    }).then(res => res.data);
}

export const deleteFile = (Id) => {
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    return axios.delete(`${base}/api/private/files/${Id}`, {
        headers: {
            'Authorization': authorization_text
        }
    }).then(res => res.status);
}

export const deleteFolder = (Id) => {
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    return axios.delete(`${base}/api/private/files/${Id}`, {
        headers: {
            'Authorization': authorization_text
        }
    }).then(res => res.status);
}

export const newFolder = (pDirId, dirName) => {
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    if (pDirId.length > 0) {
        return axios.post(`${base}/api/private/dir?pDirId=${pDirId}`, {
            name: dirName
        }, {
            headers: {
                'Authorization': authorization_text,
            }
        }).then(res => res.data)
    } else {
        return axios.post(`${base}/api/private/dir`, {
            name: dirName
        }, {
            headers: {
                'Authorization': authorization_text,
            }
        }).then(res => res.data)
    }

}

export const renameFFs = (Id, newName,) => {
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    return axios.put(`${base}/api/private/files`, {
            id: Id,
            name: newName,
            description: ''
        }, {
        headers: {
            'Authorization': authorization_text,
        }
        }
    )
}
//创建组织-本质就是创建文件夹
export const createOrg = (name, pid) => {
    return axios.post(`${base}/api/organization`, {
        name: name,
        pId: pid
    }, {
        headers: {
            'Authorization': window.sessionStorage['access_token']
        }
    })
}
//查找指定用户加入的组织
export const UserOrgs = (uid,path) => {
    return axios.get(`${base}/api/organization/${uid}/${path}`, {
		params:{
			pageIndex: 1,
			pageSize: 1000,
			sorting: 'Id'
		},
		headers:{
			'Authorization': window.sessionStorage['access_token']
		}
    }).then(res=>res.data)
}
//获取所有组织
export const AllOrgs=()=>{
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    return axios.get(`${base}/api/organizations`,{
        headers:{
            'Authorization': authorization_text
        },
    }).then(res=>res.data)
}
//上传文件
export const uploadFile=(num,DirId)=>{
    if (num===1){
        return axios.get(`${base}/api/private`,{
            headers:{
                'Authorization': window.sessionStorage['access_token']
            },
        }).then(res=>res.data)
    }else{
        return axios.get(`${base}/api/private`,{
            headers:{
                'Authorization': window.sessionStorage['access_token']
            },
            params:{
                DirId:DirId
            }
        }).then()
    }
}
//下载文件
export const downloadFile=(fileId)=>{
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token

    return axios.get(`${base}/api/private/files/${fileId}`,{
        headers: {
            'Authorization': authorization_text,
        },
        responseType:'blob'
    })
}
//获取用户头像
export const getUserLogo=()=>{
    const tempText=eval('('+window.sessionStorage.getItem('oidc.user:https://localhost:44317/:Server_Vue')+')');
    const authorization_text=tempText.token_type+' '+tempText.access_token
    return axios.get(`${base}/api/account/my-profile/profile-picture`,{
        headers:{
            'Authorization': authorization_text,
        }
    })
}



