import React, { Component } from 'react'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import {Route,Switch,Redirect} from 'react-router-dom'

export default class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/login" component={Login}/>
				<Route path="/admin" component={Admin}/>
				<Redirect to="/login"/>
			</Switch>
		)
	}
}
