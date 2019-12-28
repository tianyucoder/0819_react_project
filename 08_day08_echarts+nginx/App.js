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

//情况一：装饰器函数没有return
/* function demo(target) {
	target.a = 1
	target.b = 2
	target.c = 3
	target.d = 4
}
//装饰器函数没有return，写法如下：
@demo
class MyClass {}

//相当与：demo(MyClass)
console.log(MyClass.a,MyClass.b);  */



//情况二：装饰器函数有return，return的为非函数
/* 	function demo(target) {
			target.a = 1
			target.b = 2
			target.c = 3
			target.d = 4
			return 100
	}
//装饰器函数有return，写法如下：
@demo
class MyClass {}

//相当与：MyClass = demo(MyClass) 

console.log(MyClass.a,MyClass.b); */



//情况三：装饰器函数有return，return的为函数
/* function noDemo(data) {
	data += '!'
	console.log('noDemo需要的一些数据：',data);
	return (target)=>{
		target.a = 1
		target.b = 2
		target.c = 3
		target.d = 4
		return target
	}
}

//装饰器函数有return，值为函数，写法如下：
@noDemo('atguigu')
class MyClass {}

//相当与：MyClass = noDemo('atguigu')(MyClass)
console.log(MyClass.a,MyClass.b); */






