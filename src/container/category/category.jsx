import React, { Component } from 'react'
import {Card,Button,Icon,Table} from 'antd';

export default class Category extends Component {
	render() {
		//表格数据
		const dataSource = [
			{
				key: '1',
				name: '电脑办公',
			},
			{
				key: '2',
				name: '女士护肤',
			},
			{
				key: '3',
				name: '休闲服饰',
			},
		];
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
			<Card extra={<Button type="primary"><Icon type="plus-circle" />添加</Button>}>
				<Table 
					dataSource={dataSource} 
					columns={columns}
					bordered
				/>;
			</Card>
		)
	}
}
