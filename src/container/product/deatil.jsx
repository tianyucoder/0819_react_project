import React, { Component } from 'react'
import {Card,Button,Icon,List, message} from 'antd'
import {connect} from 'react-redux'
import {getCategoryListAsync} from '../../redux/actions/category_action'
import {reqProductById} from '../../api'
import './detail.less'

const {Item} = List

@connect(
	state => ({categoryList:state.categoryList}),
	{getCategoryListAsync}
)
class Detail extends Component {

	state = {
		product:{imgs:[]} //当前商品的详细信息
	}

	getCategoryName = ()=>{
		const {categoryId} = this.state.product
		if(!this.props.categoryList.length){
			this.props.getCategoryListAsync()
		}
		let result = this.props.categoryList.find((category)=>{
			return category._id === categoryId
		})
		if(result)return result.name
	}

	getProductById = async()=>{
		const {id} = this.props.match.params
		let result = await reqProductById(id)
		const {status,data,msg} = result
		if(status === 0){
			this.setState({product:data})
		}else{
			message.warning(msg)
		}
	}

	componentDidMount(){
		this.getProductById()
	}

	render() {
		return (
			<Card title={
				<div className='left-top'>
            <Button type="link" size="small" onClick={this.props.history.goBack}>
              <Icon type="arrow-left" style={{fontSize:'20px'}}/>
            </Button>
            <span>商品详情</span>
          </div>
			}>
				<List>
					<Item>
						<span className="detail-title">商品名称：</span>
						<span>{this.state.product.name}</span>
					</Item>
					<Item>
						<span className="detail-title">商品描述：</span>
						<span>{this.state.product.desc}</span>
					</Item>
					<Item>
						<span className="detail-title">商品价格：</span>
						<span>{this.state.product.price}</span>
					</Item>
					<Item>
						<span className="detail-title">所属分类：</span>
						<span>{this.getCategoryName()}</span>
					</Item>
					<Item>
						<span className="detail-title">商品图片：</span>
						{
							this.state.product.imgs.map((item,index)=>{
								return <img key={index} src={'/upload/'+item}alt=""/>
							})
						}
					</Item>
					<Item>
						<span className="detail-title">商品详情：</span>
						<span dangerouslySetInnerHTML={{__html:this.state.product.detail}}></span>
					</Item>
					
				</List>
			</Card>
		)
	}
}
export default Detail
