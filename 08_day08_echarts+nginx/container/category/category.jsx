import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,Form,Input, message} from 'antd';
import {connect} from 'react-redux'
import {reqAddCategory,reqUpdateCategory} from '../../api'
import {PAGE_SIZE} from '../../config'
import {getCategoryListAsync} from '../../redux/actions/category_action'

const {Item} = Form

@connect(
	state => ({categoryList:state.categoryList}),
	{getCategoryListAsync}
)
@Form.create()
class Category extends Component {

	state = {
		visible:false //是否展示Modal提示框
	};
	
	componentDidMount(){
		//分发一个异步action去获取所有商品分类列表
		//注意：并没有直接在当前组件中发送ajax请求（与Login页面对比），而是将ajax请求交给了异步action
		this.props.getCategoryListAsync()
	}

	//确认的回调
  handleOk = () => {
		this.props.form.validateFields(async(err, values) => {
      if (!err) {
				let result 
				if(this.isAdd){
					result = await reqAddCategory(values)
				}else{
					result = await reqUpdateCategory(this.id,values.categoryName)
				}
				const {status,msg} = result
				if(status === 0){
					message.success('操作分类成功',1)
					this.props.getCategoryListAsync()
					this.setState({visible:false})
					this.props.form.resetFields()
				}else{
					message.warning(msg,1)
				}
      }
		});
  };

	//取消的回调
  handleCancel = () => {
		this.props.form.resetFields()
    this.setState({visible: false,});
	};
	
	render() {
		//获取表单的装饰器
		const { getFieldDecorator } = this.props.form;
		//表格数据
		const dataSource = this.props.categoryList
		//设置列
		const columns = [
			{
				title: '分类名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '操作',
				//dataIndex: 'name',
				key: 'c',
				align:'center',
				width:'25%',
				render:(item)=> (
					<Button type="link"
						 onClick={
							 ()=>{
								 this.name = item.name
								 this.id = item._id
								 console.log(this);
								 this.isAdd = false
								 this.setState({visible:true})
								}
							}
					>修改分类</Button>)
			},
		]
		return (
			<div>
				<Card extra={
					<Button type="primary" 
						onClick={
							()=>{
								this.isAdd = true
								this.id = ''
								this.name = ''
								this.setState({visible:true})
							}
						}>
						<Icon type="plus-circle"/>添加
					</Button>}
				>
					<Table 
						dataSource={dataSource} //表格数据
						columns={columns} //表格列设置
						bordered //显示边框
						rowKey="_id" //设置key的取值
						pagination={{pageSize:PAGE_SIZE}} //每页展示数据条数
					/>
				</Card>
				<Modal
					title={this.isAdd ? "新增分类" : "修改分类"}
					visible={this.state.visible} //是否展示弹窗
					onOk={this.handleOk} //点击确认的回调
					onCancel={this.handleCancel} //点击取消的回调
					okText='确认'
					cancelText='取消'
				>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							{getFieldDecorator('categoryName', {
								initialValue:this.name || '',
								rules:[{required: true, message: '分类名必须输入'}],
							})(<Input placeholder="请输入分类名"/>)}
						</Item>
					</Form>
				</Modal>
			</div>
		)
	}
}
export default Category