import React, { Component } from 'react'
import Login from './container/login/login'
import Admin from './container/admin/admin'
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


/*  function demo(target) {
	target.a = 1
	target.b = 2
	target.c = 3
	target.d = 4
}
//装饰器一，demo没有return，装饰器写法如下
@demo
class MyClass {}

//相当与：demo(MyClass)
console.log(MyClass.a,MyClass.b); */ 


function demo(target) {
	class Test {
		
	}
	target.a = 1
	target.b = 2
	target.c = 3
	target.d = 4
	return Test
}

//装饰器二，demo有return，装饰器写法如下
@demo
class MyClass {}

//相当与：MyClass = demo(MyClass)
//console.log(MyClass.a,MyClass.x);






