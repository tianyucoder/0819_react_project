import {combineReducers} from 'redux'
import LoginReducer from './login_reducer'

export default combineReducers({
	userInfo:LoginReducer
})