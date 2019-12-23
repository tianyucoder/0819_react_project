import React, { Component } from 'react'
import {Icon,Button,Modal} from 'antd';
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {reqWeatherData} from '../../../api'
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
		isFull:false,
		date:dayjs().format('YYYY年 MM月-DD日 HH:mm:ss'),
		weatherData:{}
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

	getWeatherData = async()=>{
		let result = await reqWeatherData()
		this.setState({
			weatherData:{
				img:result.dayPictureUrl,
				temperature:result.temperature,
				weather:result.weather
			}
		})
	}

	componentDidMount(){
		//检测全屏变化
		screenfull.on('change',()=>{
			let {isFull} = this.state
			this.setState({isFull:!isFull})
		})
		//更新时间
		this.time = setInterval(()=>{
			this.setState({date:dayjs().format('YYYY年 MM月-DD日 HH:mm:ss')})
		},1000)
		//请求天气信息
		this.getWeatherData()
	}

	componentWillUnmount(){
		clearInterval(this.time)
	}

	render() {
		const {username} = this.props.userInfo.user
		const {img,weather,temperature} = this.state.weatherData
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
						<span>{this.state.date}</span>
						<img src={img} alt="天气图片"/>
						<span>{weather}  温度：{temperature}</span>
					</div>
				</div>
			</div>
		)
	}
}
export default Header
