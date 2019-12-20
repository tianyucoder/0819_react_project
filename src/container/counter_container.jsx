//counter的容器组件，起到一个连接作用
import Counter from '../components/counter'
//引入connect，用于创建一个容器组件
import {connect} from 'react-redux'

//从redux中把state取出，以props传参的形式给UI组件
function mapStateToProps (state) {
	//该方法的返回值，会作为props参数传递给UI组件
	return {count:state} //此行代码相当于：<Counter count={state}>
}

/* 
	1.如下代码会生成一个容器组件
	2.会映射redux中所保存的状态为props
	3.会建立与UI组件(counter)的联系
*/
export default connect(mapStateToProps)(Counter)


