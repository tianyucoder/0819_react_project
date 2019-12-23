import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Layout} from 'antd';
import checkLogin from '../check_login/check_login'
import {deleteUserInfo} from '../../redux/actions/login_action'
import Header from './header/header'
import './css/admin.less'
const { Footer, Sider, Content} = Layout;


@connect(
	state => ({userInfo:state.userInfo}),
	{deleteUserInfo}
)
@checkLogin
class Admin extends Component {

	/* logout = ()=>{
		//删除redux、localStorage中保存的用户数据
		this.props.deleteUserInfo()
	} */

	render() {
		return (
			<Layout className="admin">
				<Sider>Sider</Sider>
				<Layout>
					<Header/>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default Admin

