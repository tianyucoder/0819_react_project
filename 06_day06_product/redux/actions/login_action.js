import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'

//保存用户信息
export const saveUserInfo = (value)=> {
	localStorage.setItem('user',JSON.stringify(value.user))
	localStorage.setItem('token',value.token)
	return {type:SAVE_USERINFO,data:value}
}

//删除用户信息
export const deleteUserInfo = (value)=> {
	localStorage.removeItem('user')
	localStorage.removeItem('token')
	return {type:DELETE_USERINFO,data:''}
}