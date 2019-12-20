import React, { Component } from 'react'
import { Form, Icon, Input, Button} from 'antd';
import logo from './images/logo.png'
import './css/login.less'
const {Item} = Form

class Login extends Component {

	//响应表单的提交
	handleSubmit = (event)=>{
		event.preventDefault()
		this.props.form.validateFields((err, values) => {
			//进行表单最后一步统一验证
      if (!err) {
        console.log('发送请求', values);
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

//加工我们缩写的Login组件，生成一个新的WrappedLogin组件，页面真正渲染的是WrappedLogin组件
export default Form.create()(Login);


/*
  总结：
    1. 高阶函数
      定义: 如果函数接收的参数是函数或者返回值是函数
      例子: Promise() / then() / 定时器 / 数组遍历相关方法 / bind() / $() / $.get() / Form.create()
			好处: 更加动态, 更加具有扩展性

		2. 高阶组件
		定义: 接收一个组件且返回一个新组件
		例子: Form.create()(组件) / withRouter(组件) / connect()(组件)
		高阶组件与高阶函数的关系?
          高阶组件是一个特别的高阶函数
          接收的是组件函数, 同时返回新的组件函数
		作用:
				React 中用于复用组件逻辑的一种高级技巧
*/

//create方法的原理
/* 
function create (TargetComponent) {
	return class WrappedComponent extends Component{
		render(){
			return <TargetComponent form=内置的Form对象/>
		}
	}
} */
