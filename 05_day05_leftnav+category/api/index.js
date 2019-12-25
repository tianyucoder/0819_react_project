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
