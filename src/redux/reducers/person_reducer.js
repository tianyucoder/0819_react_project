//redux中的reducer，用于真正去加工状态，获取到：preState，action，
//什么时候调用reducer？1+n，初始化的时候，随后用户分发了action的时
import {ADDPERSON} from '../action_types'

let initSate = [{name:'kobe',age:18},{name:'wade',age:19}]
export default function (preState=initSate,action){
	const {type,data} = action
	let newState
	switch (type) {
		case ADDPERSON:
			newState = [...preState,data]
			return newState
		default:
			return preState
	}
}