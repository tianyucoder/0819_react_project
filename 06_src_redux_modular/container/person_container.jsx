//引入UI组件(Counter)
import Person from '../components/person'
//引入action_creators
import {addPerson} from '../redux/actions/person_action'
//引入connect，用于创建一个容器组件
import {connect} from 'react-redux'

export default connect(
	state => ({persons:state.persons}), //映射状态为props
	{addPerson} //映射dispatch为props
)(Person)



