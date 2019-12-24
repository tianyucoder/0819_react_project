import {GET_CATEGORY_LIST} from '../action_types'
import {message} from 'antd'
import {reqCategoryList} from '../../api'

//获取商品列表---同步action
export const getCategoryList = (value)=> {
	return {type:GET_CATEGORY_LIST,data:value}
}

//获取商品列表---异步action
export const getCategoryListAsync = ()=> {
	return async(dispatch)=>{
		let result = await reqCategoryList()
		const {status,data,msg} = result
		if(status === 0){
			dispatch(getCategoryList(data))
		}else{
			message.error(msg)
		}
	}
}