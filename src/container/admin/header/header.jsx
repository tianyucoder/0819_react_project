import React, { Component } from 'react'
import {Icon,Button} from 'antd';
import './header.less'

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="header-top">
					<Button size="small">
						<Icon type="fullscreen"/>
					</Button>
					<span>hello,atguigu</span>
					<Button href="#1" size="small" type="link">退出登录</Button>
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
