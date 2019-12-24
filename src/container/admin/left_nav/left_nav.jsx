import React, { Component } from 'react'
import {Menu,Icon} from 'antd';
import {Link} from 'react-router-dom'
import menuList from '../../../config/menu-config'
import logo from '../../../static/images/logo.png'
import './left_nav.less'

const {SubMenu,Item} = Menu;

export default class LeftNav extends Component {

	createMenu = (list)=>{
		return list.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key}>
						<Link to={menuObj.path}>
							<Icon type={menuObj.icon} />
							<span>{menuObj.title}</span>
						</Link>
					</Item>
				)
			}else{
				return (
					<SubMenu
						key={menuObj.key}
						title={
							<span>
								<Icon type={menuObj.icon} />
								<span>{menuObj.title}</span>
							</span>
					}>
						{this.createMenu(menuObj.children)}
					</SubMenu>
				)
			}
		})
	}

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
	};
	
	render() {
		return (
			<div>
				<div className="nav-top">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</div>
        <Menu
          defaultSelectedKeys={['home']} //自动选中哪个菜单
          defaultOpenKeys={['sub1']} //自动打开哪个菜单
          mode="inline"
          theme="dark"
        >
					{this.createMenu(menuList)}
        </Menu>
      </div>
		)
	}
}
