import React, { Component } from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import {connect} from 'react-redux'
import {saveUserInfo} from '../../redux/actions/login_action'
import checkLogin from '../check_login/check_login'
import {reqLogin} from '../../api'
import logo from '../../static/images/logo.png'
import './css/login.less'
const {Item} = Form

@connect(
	state => ({userInfo:state.userInfo}),//映射状态
	{saveUserInfo}//映射操作状态的方法
)
@Form.create()
@checkLogin
class Login extends Component {
	//响应表单的提交
	handleSubmit = (event)=>{
		event.preventDefault()
		this.props.form.validateFields(async(err, values) => {
			//进行表单最后一步统一验证
      if (!err) {
				let loginResult = await reqLogin(values)
				const {status,data,msg} = loginResult
				if(status === 0){
					message.success('登录成功',1)
					this.props.history.push('/admin')
					//此处把data交给redux管理
					this.props.saveUserInfo(data)
				}else{
					message.warning(msg,1)
				}
			}
    });
	}

	//自定义密码的验证器
	pwdValidator = (rule, value, callback)=>{
		if(!value){
			callback('密码必须输入')
		}else if(value.length < 4){
			callback('密码必须大于等于4位')
		}else if(value.length > 12){
			callback('密码必须小于等于12位')
		}else if(!(/^\w+$/).test(value)){
			callback('密码必须是英文、数字或下划线组成')
		}
		callback()
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							{/* 用户名/密码的的合法性要求
									1). 必须输入
									2). 必须大于等于4位
									3). 必须小于等于12位
									4). 必须是英文、数字或下划线组成 */}
							{getFieldDecorator('username', {
								rules: [
									{required: true, message: '用户名必须输入'}, //限制该输入域必须输入
									{min: 4, message: '用户名必须大于等于4位'}, //限制该输入域必须输入
									{max: 12, message: '用户名必须小于等于12位'}, //限制该输入域必须输入
									{pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成'}, //限制该输入域必须输入
								],
							})(
								<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="用户名"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator('password', {
									rules: [
										{validator:this.pwdValidator}, 
									],
								})(
									<Input
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										type="password"
										placeholder="密码"
									/>
								)}
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default Login