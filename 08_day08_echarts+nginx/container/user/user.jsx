import React, { Component } from 'react'
import {Card,Table,Button,Icon,Modal,Form,Input,Select, message} from 'antd';
import dayjs from 'dayjs'
import {reqAddUser} from '../../api'
import {reqUserList} from '../../api'

const {Item} = Form
const {Option} = Select
const {confirm} = Modal

@Form.create()
class User extends Component {

	state = {
		visible:false,
		userList:[],
		roleList:[]
	}

	getUserList = async()=>{
		let result = await reqUserList()
		const {status,data,msg} = result
		if(status === 0){
			this.setState({userList:data.users.reverse()})
			this.setState({roleList:data.roles})
		}else{
			message.warning(msg)
		}
	}

	componentDidMount(){
		this.getUserList()
	}

	handleOk = ()=>{
		this.props.form.validateFields(async(err,values)=>{
			if(!err){
				let result = await reqAddUser(values)
				const {status,msg} = result
				if(status === 0){
					message.success('新增用户成功')
					this.getUserList()
				}else{
					message.warning(msg)
				}
			}
		})
		this.setState({visible:false})
		this.props.form.resetFields()
	}

	handleCancel = ()=>{
		this.setState({visible:false})
		this.props.form.resetFields()
	}

	deleteUser = ()=>{
		confirm({
			title: `确定删除该用户吗？`,
			cancelText:'取消',
			okText:'确定',
			onOk:()=> {
				console.log();
			},
		});
	}

	render() {
		const dataSource = this.state.userList
		const columns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				width:"20%",
				align:"center",
				key: 'create_time',
				render:(create_time)=> dayjs(create_time).format('YYYY年 MM月-DD日 HH:mm')
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				align:"center",
				key: 'role_id',
				render:(role_id)=>{
					let result = this.state.roleList.find((item)=>{
						return item._id === role_id
					})
					if(result) return result.name
					else return ''
				}
			},
			{
				title: '操作',
				//dataIndex: 'address',
				key: 'opera',
				width:"15%",
				align:"center",
				render:(item)=>(
					<div>
						<Button type="link" onClick={()=>{this.setState({visible:true})}}>修改</Button>
						<Button type="link" onClick={()=>{this.deleteUser(item._id)}}>删除</Button>
					</div>
				)
			},
		];
		const {getFieldDecorator} = this.props.form
		return (
			<Card 
				title={
					<Button type='primary' onClick={()=>{this.setState({visible:true})}}>
						<Icon type="plus"/>创建用户
					</Button>
				}
			>
				<Table 
					dataSource={dataSource}
					columns={columns}
					bordered
					rowKey='_id'
				/>
				<Modal
          title="添加用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form labelCol={{span:4}} wrapperCol={{span:16}}>
            <Item label="用户名">
              {getFieldDecorator('username', {
                rules: [
									{required: true, message: '用户名必须输入'}, //限制该输入域必须输入
									{min: 4, message: '用户名必须大于等于4位'}, //限制该输入域必须输入
									{max: 12, message: '用户名必须小于等于12位'}, //限制该输入域必须输入
									{pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成'}, //限制该输入域必须输入
								],
              })(<Input placeholder="请输入用户名"/>)}
            </Item>
            <Item label="密码" >
              {getFieldDecorator('password', {
                 rules: [
									{required: true, message: '密码必须输入'}, //限制该输入域必须输入
									{min: 4, message: '密码必须大于等于4位'}, //限制该输入域必须输入
									{max: 12, message: '密码必须小于等于12位'}, //限制该输入域必须输入
									{pattern: /^\w+$/, message: '密码必须是英文、数字或下划线组成'}, //限制该输入域必须输入
								],
              })(<Input placeholder="请输入密码" type="password"/>)}
            </Item>
            <Item label="手机号">
              {getFieldDecorator('phone', {
                rules: [{required: true, message: '手机号必须输入' },],
              })(<Input placeholder="请输入手机号"/>)}
            </Item>
            <Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [{required: true, message: '邮箱必须输入' },],
              })(<Input placeholder="请输入邮箱"/>)}
            </Item>
            <Item label="角色">
              {getFieldDecorator('role_id', {
								initialValue:"",
                rules: [{required: true, message: '必须选择一个角色' },],
              })(<Select>
                  <Option value=''>请选择一个角色</Option>
                  {
										this.state.roleList.map((roleObj)=>{
											return <Option key={roleObj._id} value={roleObj._id}>{roleObj.name}</Option>
										})
									}
                </Select>)}
            </Item>
          </Form>
        </Modal>
			</Card>
		)
	}
}

export default User
