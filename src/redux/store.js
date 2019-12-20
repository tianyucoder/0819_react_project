//引入createStore，用于创建redux最核心的store
import {createStore,applyMiddleware} from 'redux'
//引入reducer，用于真正操作状态
import reducer from './reducer'
//引入redux-thunk，用于处理异步action
import thunk from 'redux-thunk'
//暴露store
export default createStore(reducer,applyMiddleware(thunk))