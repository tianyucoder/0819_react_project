import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import {BASE_URL} from '../config'
import qs from 'querystring'
import 'nprogress/nprogress.css'

//请求基本路径
axios.defaults.baseURL = BASE_URL

//请求拦截器
axios.interceptors.request.use((config)=>{
	NProgress.start()//进度条开始
	let {method,data} = config
	//统一处理将所有post参数都改为urlencoded形式
	if(method.toUpperCase() === 'POST' && data instanceof Object){
		config.data = qs.stringify(data)
	}
	return config
})

//响应拦截器
axios.interceptors.response.use(
	(response)=>{
		NProgress.done()//进度条结束
		return response.data//返回真正数据
	},
	(error)=>{
		NProgress.done()
		//统一处理所有请求失败
		message.error('请求出错，请联系管理员')
		return new Promise(()=>{})//中断Promise链
	})

export default axios