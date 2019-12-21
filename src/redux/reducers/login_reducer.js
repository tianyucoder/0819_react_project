import {SAVE_USERINFO} from '../action_types'

//从localStorage中读取之前保存的用户信息（可能读取不到，如读到了，就给redux初始化用）
let _user = JSON.parse(localStorage.getItem('user'))
let _token = localStorage.getItem('token')

let initState = {
	user:_user || {},
	token:_token || '',
	isLogin:_user&&_token ? true : false
}

export default function (preState=initState,action) {
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_USERINFO:
			newState = {user:data.user,token:data.token}
			return newState
		default:
			return preState;
	}
}