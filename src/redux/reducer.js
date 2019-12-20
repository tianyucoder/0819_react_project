//redux中的reducer，用于真正去加工状态，获取到：preState，action，
//什么时候调用reducer？1+n，初始化的时候，随后用户分发了action的时
import {INCREMENT,DECREMENT} from './action_types'

let initSate = 0
export default function (preState=initSate,action){
	const {type,data} = action
	let newState
	switch (type) {
		case INCREMENT:
			newState = preState + data
			return newState
		case DECREMENT:
			newState = preState - data
			return newState
		default:
			return preState
	}
}