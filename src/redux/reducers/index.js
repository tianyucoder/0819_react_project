import {combineReducers} from 'redux' //引入combineReducers用于合并多个reducer
import LoginReducer from './login_reducer' //引入login_reducer

//经过combineReducers，汇总一个总状态交给redux
export default combineReducers({
	userInfo:LoginReducer
})

/* 
	redux中保存的总状态如下：
		{
			userInfo：{
				user:xxxxxx
				token:xxxxxx
				isLogin:xxxxx
			}
		}

*/