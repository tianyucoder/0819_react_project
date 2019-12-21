import React, { Component } from 'react'

export default class Counter extends Component {
	//加
	increment = ()=>{
		const {selected_number} = this.refs
		this.props.increment(selected_number.value*1)
	}
	//减
	decrement = ()=>{
		const {selected_number} = this.refs
		this.props.decrement(selected_number.value*1)
	}
	//奇数加
	incrementIfOdd = ()=>{
		const {selected_number} = this.refs
		const {count} =  this.props
		if(count%2 === 1){
			this.props.increment(selected_number.value*1)
		}
	}
	//延迟加
	incrementAsync = ()=>{
		const {selected_number} = this.refs
		this.props.incrementAsync(selected_number.value*1,500)
	}

	render() {
		return (
			<div>
				<span>count is {this.props.count}，Person组件中共有{this.props.persons.length}人</span><br/>&nbsp;
				<select ref="selected_number">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
				<button onClick={this.incrementAsync}>increment async</button>
			</div>
		)
	}
}