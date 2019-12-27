import React, { Component } from 'react'
import {Card,Table,Button,Icon,Modal,Form,Input, message,Tree } from 'antd';
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole} from '../../api'

const {Item} = Form
const {TreeNode} = Tree;

@Form.create()
class User extends Component {

	state = {
		visible:false, //控制新增角色显示
		visibleAuth:false,//控制授权显示
		roleList:[],
    checkedKeys: ['0-0-0'],
	}

	//获取角色列表
	getRoleList = async()=>{
		let result = await reqRoleList()
		const {status,data,msg} = result
		if(status === 0){
			this.setState({roleList:data.reverse()})
		}else{
			message.warning(msg)
		}
	}

	componentDidMount(){
		this.getRoleList()
	}

	//添加角色的确认回调
	handleOk = ()=>{
		this.props.form.validateFields(async(err,values)=>{
			if(!err){
				let result = await	reqAddRole(values)
				const {status,data,msg} = result
				if(status === 0 ) {
					let {roleList} = this.state
					roleList.unshift(data)
					this.setState({roleList})
				}else{
					message.warning(msg)
				}
				this.setState({visible:false})
				this.props.form.resetFields()
			}
		})
		
	}

	//添加角色的取消回调
	handleCancel = ()=>{
		this.setState({visible:false})
		this.props.form.resetFields()
	}

	//授权的确认回调
	handleAuthOk = ()=>{
		this.setState({visibleAuth:false})
	}

	//授权的取消回调
	handleAuthCancel = ()=>{
		this.setState({visibleAuth:false})
	}

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
	});

	render() {
		const {roleList} = this.state
		const dataSource = roleList
		const columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(create_time)=> dayjs(create_time).format('YYYY年 MM月-DD日 HH:mm')
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
				render:(auth_time)=> {
					if(auth_time) return dayjs(auth_time).format('YYYY年 MM月-DD日 HH:mm')
					else return ''
				}
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				width:"15%",
				align:"center",
				key: 'auth_name',
			},
			{
				title: '操作',
				//dataIndex: 'address',
				key: 'opera',
				width:"15%",
				align:"center",
				render:()=>(<Button type="link" onClick={()=>{this.setState({visibleAuth:true})}}>设置权限</Button>)
			},
		];
		const treeData = [
			{
				title: '0-0',
				key: '0-0',
				children: [
					{
						title: '0-0-0',
						key: '0-0-0',
						children: [
							{ title: '0-0-0-0', key: '0-0-0-0' },
							{ title: '0-0-0-1', key: '0-0-0-1' },
							{ title: '0-0-0-2', key: '0-0-0-2' },
						],
					},
					{
						title: '0-0-1',
						key: '0-0-1',
						children: [
							{ title: '0-0-1-0', key: '0-0-1-0' },
							{ title: '0-0-1-1', key: '0-0-1-1' },
							{ title: '0-0-1-2', key: '0-0-1-2' },
						],
					},
					{
						title: '0-0-2',
						key: '0-0-2',
					},
				],
			},
			{
				title: '0-1',
				key: '0-1',
				children: [
					{ title: '0-1-0-0', key: '0-1-0-0' },
					{ title: '0-1-0-1', key: '0-1-0-1' },
					{ title: '0-1-0-2', key: '0-1-0-2' },
				],
			},
			{
				title: '0-2',
				key: '0-2',
			},
		];
		const {getFieldDecorator} = this.props.form
		return (
			<Card 
				title={
					<Button type='primary' onClick={()=>{this.setState({visible:true})}}>
						<Icon type="plus"/>新增角色
					</Button>
				}
			>
				<Table 
					dataSource={dataSource}
					columns={columns}
					bordered
					rowKey="_id"
				/>
				{/* 新增角色弹窗 */}
				<Modal
          title="新增角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form>
            <Item>
              {getFieldDecorator('roleName', {
                rules: [{required: true, message: '角色名必须输入' },],
              })(<Input placeholder="请输入角色名"/>)}
            </Item>
          </Form>
        </Modal>
				<Modal
          title="授权"
          visible={this.state.visibleAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText="确认"
          cancelText="取消"
        >
          <Tree
						checkable //树的节点是否可以选择
						onCheck={this.onCheck}//选择某个菜单的回调
						checkedKeys={this.state.checkedKeys}//默认选择哪一个
						defaultExpandAll
					>
						{this.renderTreeNodes(treeData)}
					</Tree>
        </Modal>
			</Card>
		)
	}
}

export default User
