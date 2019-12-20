import React, { Component } from 'react'
import Counter from './components/counter'

export default class App extends Component {
	render(){
		const {store} = this.props
		return (
			<Counter store={store}/>
		)
	}	
}
