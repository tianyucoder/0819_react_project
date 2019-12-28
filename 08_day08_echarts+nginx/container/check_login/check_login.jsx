//自定义的高阶组件
import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

export default function (CurrentComponent) {
	@connect(
		state => ({isLogin:state.userInfo.isLogin}),
		{}
	)
	class NewComponent extends Component{
		render(){
			const {...params} = this.props
			//想去admin，但是未登录，不允许，跳转到login
			//想去login，但是登录了，不允许，跳转到admin
			const {pathname} = this.props.history.location;
			if(pathname === '/login' && this.props.isLogin) return <Redirect to="/admin"/>
			if(pathname !== '/login' && !this.props.isLogin) return <Redirect to="/login"/>
			return <CurrentComponent {...params}/>
		}
	}
	return NewComponent
}