import React, { Component } from 'react'
import {reqProductList,reqSearchProduct} from '../../api'
import {PAGE_SIZE} from '../../config'
import {Card,Button,Icon,Table,Select,Input, message} from 'antd';

const {Option} = Select;

export default class Product extends Component {

	state = {
		productList:[],
		pages:'',
		total:'',
		searchType:'productName',
		keyWord:''
	}

	getProductList = async(pageNum,pageSize)=>{
		let result
		let {searchType,keyWord} = this.state
		if(this.isSearch){
			result	= await reqSearchProduct(searchType,keyWord,pageNum,pageSize)
		}else{
			result = await reqProductList(pageNum,pageSize)
		}
		const {status,data,msg} = result
		//console.log(data);
		if(status===0){
			this.setState({
				productList:data.list,
				pages:data.pages,
				total:data.total
			})
		}else{
			message.warning(msg)
		}
	}

	componentDidMount(){
		this.getProductList(1,PAGE_SIZE)
	}

	render() {
		const dataSource = this.state.productList;
		
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				width:'45%',
				key: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				align:'center',
				key: 'price',
				width:'10%',
				render:price => '￥'+price
			},
			{
				title: '状态',
				dataIndex: 'status',
				align:'center',
				key: 'status',
				width:'10%',
				render:(status)=> (
					<div>
						<Button type={status===1?'danger':'primary'}>
							{status===1?'下架':'上架'}
						</Button><br/>
					<span>{status===1?'在售':'已停售'}</span>
					</div>)
			},
			{
				title: '操作',
				//dataIndex: 'address',
				key: 'opera',
				align:'center',
				width:'10%',
				render:()=> (<div><Button type="link">详情</Button><br/><Button type="link">修改</Button></div>)
			},
		];
		return (
			<Card 
				title={
					<div>
						<Select defaultValue="productName" onChange={(value)=>{this.setState({searchType:value})}}>
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input 
							placeholder="输入关键字" 
							style={{width:'150px',margin:'0px 10px'}} 
							allowClear
							onChange={(event)=>{this.setState({keyWord:event.target.value})}}
						/>
						<Button type="primary" onClick={()=>{this.isSearch=true;this.getProductList(1,PAGE_SIZE)}}><Icon type="search"/>搜索</Button>
					</div>} 
				extra={<Button type="primary"><Icon type="plus-circle"/>添加商品</Button>}
			>
				<Table 
					dataSource={dataSource} 
					columns={columns} 
					bordered
					rowKey="_id" //设置key的取值
					pagination={{
						total:this.state.total,
						pageSize:PAGE_SIZE,
						onChange:(pageNumber)=>{
							this.getProductList(pageNumber,PAGE_SIZE)
						}
					}}
				/>
			</Card>	
		)
	}
}
