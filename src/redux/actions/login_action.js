import {SAVE_USERINFO} from '../action_types'

export const saveUserInfo = (value)=> {
	localStorage.setItem('user',JSON.stringify(value.user))
	localStorage.setItem('token',value.token)
	return {type:SAVE_USERINFO,data:value}
}