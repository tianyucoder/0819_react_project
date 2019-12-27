import React, { Component } from 'react'
import {Menu,Icon} from 'antd';
import {connect} from 'react-redux'
import {saveMenuTitle} from '../../../redux/actions/menu_action'
import {Link,withRouter} from 'react-router-dom'
import menuList from '../../../config/menu-config'
import logo from '../../../static/images/logo.png'
import './left_nav.less'

const {SubMenu,Item} = Menu;

@connect(
	state => ({menus:state.userInfo.user.role.menus,username:state.userInfo.user.username}),
	{saveMenuTitle}
)
@withRouter
class LeftNav extends Component {

	hasAuth = (menuObj)=>{
		const {menus} = this.props
		if(this.props.username === 'admin') return true
		if(!menuObj.children){
			return menus.find((item)=> item === menuObj.key)
		}else{
			return menuObj.children.some((item2)=> menus.indexOf(item2.key) !== -1 )
		}
	}

	createMenu = (list)=>{
		return list.map((menuObj)=>{
			if(this.hasAuth(menuObj)){
				if(!menuObj.children){
					return (
						<Item key={menuObj.key} onClick={()=>{this.props.saveMenuTitle(menuObj.title)}}>
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
			}
		})
	}

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
	};
	
	render() {
		const {pathname} = this.props.history.location
		//console.log('----render-left-nav------',pathname.split('/').reverse()[0]);
		return (
			<div>
				<div className="nav-top">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</div>
        <Menu
          selectedKeys={[pathname.indexOf('/product') !== -1 ? 'product' : pathname.split('/').reverse()[0]]} //自动选中哪个菜单,此处不要使用defaultSelectedKeys,会造成第二次设置失效。
          defaultOpenKeys={pathname.split('/').splice(2)} //自动打开哪个菜单
          mode="inline"
          theme="dark"
        >
					{this.createMenu(menuList)}
        </Menu>
      </div>
		)
	}
}
export default LeftNav
