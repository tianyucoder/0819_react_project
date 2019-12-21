import React, { Component } from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
	render() {
		return (
			<div>
				hello,{this.props.userInfo.user.username}
			</div>
		)
	}
}

export default connect(
	state => ({userInfo:state.userInfo}),
	{}
)(Admin)
