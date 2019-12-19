import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import logo from './images/logo.png'
import './css/login.less'

export default class Login extends Component {
	render() {
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Form.Item>
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="用户名"
							/>
						</Form.Item>
						<Form.Item>
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="密码"
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}
