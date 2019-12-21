import myAxios from './myAxios'

//项目中所有的ajax请求，都在此匹配一个方法
export const reqLogin = (loginObj)=> myAxios.post('/login',loginObj)

