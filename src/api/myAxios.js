import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import {BASE_URL} from '../config'
import qs from 'querystring'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = BASE_URL

//请求拦截器
axios.interceptors.request.use((config)=>{
	NProgress.start()
	let {method,data} = config
	//统一处理所有post请求携带参数的问题
	if(method.toUpperCase() === 'POST' && data instanceof Object){
		config.data = qs.stringify(data)
	}
	return config
})

//响应拦截器
axios.interceptors.response.use(
	(response)=>{
		NProgress.done()
		return response.data
	},
	(error)=>{
		NProgress.done()
		//统一处理所有请求失败
		message.error('请求出错，请联系管理员')
		return new Promise(()=>{})
	})

export default axios