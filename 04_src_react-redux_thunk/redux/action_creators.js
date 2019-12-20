//专门用于制造action对象
import {INCREMENT,DECREMENT} from './action_types'
export const increment = (value)=> ({type:INCREMENT,data:value}) //分发同步action
export const decrement = (value)=> ({type:DECREMENT,data:value})//分发同步action

export const incrementAsync = (value,time)=> { //分发异步action
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(increment(value))//分发同步action
		},time)
	}
}
