import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../redux/actions/login_action'
import {Redirect} from 'react-router-dom'

@connect(
	state => ({userInfo:state.userInfo}),
	{deleteUserInfo}
)
class Admin extends Component {

	logout = ()=>{
		//删除redux、localStorage中保存的用户数据
		this.props.deleteUserInfo()
	}

	render() {
		if(!this.props.userInfo.isLogin){
			//进入此判断，意味着：用户已经登录，但是还要看login，不允许，强制跳转到admin
			//this.props.history.replace('/admin')
			return <Redirect to="/login"/>
		}
		return (
			<div style={{fontSize:"25px"}}>
				hello,{this.props.userInfo.user.username}
				<button onClick={this.logout}>退出登录</button>
			</div>
		)
	}
}

export default Admin

