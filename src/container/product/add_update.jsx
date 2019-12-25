import React, { Component } from 'react'
import {connect} from 'react-redux' 
import {getCategoryListAsync} from '../../redux/actions/category_action'
import PicturesWall from './pictures_wall'
import {Card,Button,Icon,Form,Input,Select} from 'antd'

const {Item} = Form
const {Option} = Select

@connect(
	state => ({categoryList:state.categoryList}),
	{getCategoryListAsync}
)
@Form.create()
class AddUpdate extends Component {

	componentDidMount(){
		if(!this.props.categoryList){
			this.props.getCategoryListAsync()
		}
	}

	handleSubmit = (event)=>{
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
				console.log('发送请求',values);
			}
    });
  }

	render() {
    const {getFieldDecorator} = this.props.form;
    return (
        <Card 
          title={
            <div>
              <Button type="link" onClick={this.props.history.goBack}>
                <Icon type="arrow-left"/>
                <span>返回</span>
              </Button>
              <span>商品添加</span>
            </div>}
        >
          <Form 
						onSubmit={this.handleSubmit}
						labelCol={{span:2}}
						wrapperCol={{span:7}}
          >
            <Item label="商品名称">
              {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入商品名称' }],
                })(<Input placeholder="商品名称"/>)}
            </Item>
            <Item label="商品描述">
              {getFieldDecorator('desc', {
                rules: [{required: true, message: '请输入商品描述' }],
              })(<Input placeholder="商品描述"/>)}
            </Item>
            <Item label="商品价格">
              {getFieldDecorator('price', {
                rules: [{required: true, message: '请输入商品价格' }],
              })(<Input
                  placeholder="商品价格"
                />)}
            </Item>
            <Item label="商品分类">
              {getFieldDecorator('categoryId', {
								initialValue:'',
                rules: [{required: true, message: '请选择一个分类' }],
              })(<Select>
                  <Option value="">请选择分类</Option>
                  {
										this.props.categoryList.map((category)=>{
											return <Option key={category._id} value={category._id}>{category.name}</Option>
										})
									}
                </Select>)}
            </Item>
            <Item label="商品图片">
              <PicturesWall/>
            </Item>
            <Item label="商品详情">
              富文本组件
            </Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form>
        </Card>
    )
  }
}
export default AddUpdate
