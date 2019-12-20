//引入UI组件(Counter)
import Counter from '../components/counter'
//引入action_creators
import {increment,decrement,incrementAsync} from '../redux/action_creators'
//引入connect，用于创建一个容器组件
import {connect} from 'react-redux'

export default connect(
	state => ({count:state}), //映射状态为props
	{increment,decrement,incrementAsync} //映射dispatch为props
)(Counter)



