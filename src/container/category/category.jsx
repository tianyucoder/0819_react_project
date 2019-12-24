import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,Form,Input} from 'antd';
import {connect} from 'react-redux'
import {PAGE_SIZE} from '../../config'
import {getCategoryListAsync} from '../../redux/actions/category_action'

const {Item} = Form

@connect(
	state => ({categoryList:state.categoryList}),
	{getCategoryListAsync}
)
@Form.create()
class Category extends Component {
	state = {visible:false};
	
	componentDidMount(){
		this.props.getCategoryListAsync()
	}

	//展示弹窗
	showModal = () => {
    this.setState({visible: true,});
  };

	//确认的回调
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

	//取消的回调
  handleCancel = () => {
    this.setState({
      visible: false,
    });
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
				dataIndex: 'todo',
				key: 'c',
				align:'center',
				width:'25%',
				render:()=>{return <Button type="link">修改分类</Button>}
			},
		]
		return (
			<div>
				<Card extra={<Button type="primary" onClick={this.showModal}><Icon type="plus-circle"/>添加</Button>}>
					<Table 
						dataSource={dataSource} 
						columns={columns}
						bordered
						rowKey="_id"
						pagination={{pageSize:PAGE_SIZE}}
					/>
				</Card>
				<Modal
					title="新增分类"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText='确认'
					cancelText='取消'
				>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							{getFieldDecorator('categoryName', {
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