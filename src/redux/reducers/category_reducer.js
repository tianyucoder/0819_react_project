import {GET_CATEGORY_LIST} from '../action_types'

//初始状态
let initState = []
export default function (preState=initState,action) {
	const {type,data} = action
	let newState
	switch (type) {
		case GET_CATEGORY_LIST:
			newState = [...data]
			return newState
		default:
			return preState;
	}
}