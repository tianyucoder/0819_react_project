import {GET_CATEGORY_LIST} from '../action_types'
import {message} from 'antd'
import {reqCategoryList} from '../../api'

//获取商品列表---同步action--用于向redux中存入异步action获取到的所有分类信息
export const getCategoryList = (value)=> {
	return {type:GET_CATEGORY_LIST,data:value}
}

//获取商品列表---异步action---去联系服务器获取商品分类的数据
export const getCategoryListAsync = ()=> {
	return async(dispatch)=>{
		let result = await reqCategoryList()
		const {status,data,msg} = result
		if(status === 0){
			dispatch(getCategoryList(data)) //分发一个同步的action用于保存获取的所有分类信息
		}else{
			message.error(msg)
		}
	}
}

/* 
	备注：
		1.一般来说，一个异步的action都会匹配一个同步的action
		2.异步的action中往往用于发送ajax请求、开启定时器，等异步任务。
		3.同步action很简单，就是单纯的创建一个action对象，包含：type,data
*/