//用于汇总所有的reducer，最终生成一个最终的reducer
import CounterReducer from './counter_reducer'
import PersonReducer from './person_reducer'
import {combineReducers} from 'redux'


export default combineReducers({
	count:CounterReducer,
	persons:PersonReducer
})

/* 
	redux中所保存的状态格式为
	{
		count:0
		person:[{name:'kobe',age:18},{name:'wade',age:19}]
	}
*/