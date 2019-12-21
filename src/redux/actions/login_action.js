import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'

export const saveUserInfo = (value)=> {
	localStorage.setItem('user',JSON.stringify(value.user))
	localStorage.setItem('token',value.token)
	return {type:SAVE_USERINFO,data:value}
}

export const deleteUserInfo = (value)=> {
	localStorage.removeItem('user')
	localStorage.removeItem('token')
	return {type:DELETE_USERINFO,data:''}
}