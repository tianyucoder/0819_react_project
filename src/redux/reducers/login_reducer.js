import {SAVE_USERINFO} from '../action_types'

let initState = {
	user:{},
	token:''
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