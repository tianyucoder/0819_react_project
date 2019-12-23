import React, { Component } from 'react'
import {Icon,Button,Modal} from 'antd';
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../../redux/actions/login_action'
import screenfull from 'screenfull'
import './header.less'

const {confirm} = Modal;

@connect(
	state => ({userInfo:state.userInfo}),
	{deleteUserInfo}
)
class Header extends Component {

	state = {
		isFull:false
	}

	//退出登录
	logout = ()=>{
		confirm({
			title: '确定退出吗？',
			content: '若退出需要重新登录',
			cancelText:'取消',
			okText:'确定',
			onOk:()=> {
				this.props.deleteUserInfo()
			},
		});
	}

	//全屏切换
	switchFullScreen = ()=>{
		screenfull.toggle();
	}

	componentDidMount(){
		screenfull.on('change',()=>{
			let {isFull} = this.state
			this.setState({isFull:!isFull})
		})
	}

	render() {
		const {username} = this.props.userInfo.user
		return (
			<div className="header">
				<div className="header-top">
					<Button size="small" onClick={this.switchFullScreen}>
						<Icon type={this.state.isFull ? 'fullscreen-exit' : 'fullscreen'}/>
					</Button>
					<span>欢迎,{username}</span>
					<Button size="small" type="link" onClick={this.logout}>退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="header-bottom-left">
						<span>首页</span>
					</div>
					<div className="header-bottom-right">
						<span>2019年 12月23日 11:58:38</span>
						<img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="天气图片"/>
						<span>多云转阴   温度：3 ~ -4℃</span>
					</div>
				</div>
			</div>
		)
	}
}
export default Header
