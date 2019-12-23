import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Layout} from 'antd';
import checkLogin from '../check_login/check_login'
import {deleteUserInfo} from '../../redux/actions/login_action'
import Header from './header/header'
import './css/admin.less'
import {reqCategory} from '../../api'
const { Footer, Sider, Content} = Layout;


@connect(
	state => ({userInfo:state.userInfo}),
	{deleteUserInfo}
)
@checkLogin
class Admin extends Component {

	demo = async()=>{
		//请求数据库中所有商品分类
		let result = await reqCategory()
		console.log(result);
	}

	render() {
		return (
			<Layout className="admin">
				<Sider>
					<button onClick={this.demo}>点我获取商品分类数据</button>
				</Sider>
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

