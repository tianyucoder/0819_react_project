import myAxios from './myAxios'

//项目中所有的ajax请求，都由该模块统一管理
export const reqLogin = (loginObj)=> myAxios.post('/login',loginObj)

