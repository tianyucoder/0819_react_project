import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../redux/actions/login_action'
import checkLogin from '../check_login/check_login'
import {Layout} from 'antd';
import './css/admin.less'
const {Header, Footer, Sider, Content} = Layout;


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
					<Header>Header</Header>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default Admin

