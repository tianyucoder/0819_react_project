import myAxios from './myAxios'
import {message} from 'antd'
import jsonp from 'jsonp'
import {WEATHER_AK,WEATHER_CITY,WEATHER_BASE_URL} from '../config'

//项目中所有的ajax请求，都由该模块统一管理
export const reqLogin = (loginObj)=> myAxios.post('/login',loginObj)
//请求天气信息（使用jsonp的方式）
export const reqWeatherData = () => {
	return new Promise((resolve,reject)=>{
		jsonp(`${WEATHER_BASE_URL}?location=${WEATHER_CITY}&output=json&ak=${WEATHER_AK}`,(err,data)=>{
			if(!err){
				resolve(data.results[0].weather_data[0]);
			}else{
				message.error('请求天气数据失败，请联系管理员')
			}
		})
	})
}
//请求商品分类列表
export const reqCategoryList = () => myAxios.get('/manage/category/list')
//添加商品分类
export const reqAddCategory = ({categoryName}) => myAxios.post('/manage/category/add',{categoryName})
//更新分类
export const reqUpdateCategory = (categoryId,categoryName) => myAxios.post('/manage/category/update',{categoryId,categoryName})
//获取商品列表
export const reqProductList = (pageNum,pageSize) => myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
//搜索商品（按名称或按描述）
export const reqSearchProduct = (searchType,keyWrod,pageNum,pageSize) => myAxios.get('/manage/product/search',{params:{[searchType]:keyWrod,pageNum,pageSize}})
//更新商品状态
export const reqUpdateProductStatus = (productId,status) => myAxios.post('/manage/product/updateStatus',{productId,status})
//请求商品详细信息
export const reqProductById = (productId) => myAxios.get('/manage/product/info',{params:{productId}})
//添加商品
export const reqAddproduct = ({categoryId,name,desc,price,detail,imgs}) =>
 myAxios.post('/manage/product/add',{categoryId,name,desc,price,detail,imgs})
//删除已经上传的图片
 export const reqDeletePicture = (name) => myAxios.post('/manage/img/delete',{name})
//更新商品
 export const reqUpdateProduct = ({ _id,categoryId,name,desc,price,detail,imgs}) => 
 	myAxios.post('/manage/product/update',{_id,categoryId,name,desc,price,detail,imgs})
//获取所有角色列表
export const reqRoleList = () => myAxios.get('/manage/role/list')
//添加角色
export const reqAddRole = ({roleName}) => myAxios.post('/manage/role/add',{roleName})







