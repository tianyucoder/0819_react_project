//引入UI组件(Counter)
import Counter from '../components/counter'
import {increment,decrement} from '../redux/action_creators'
//引入connect，用于创建一个容器组件
import {connect} from 'react-redux'

//从redux中把state取出，以props传参的形式给UI组件
//完整版写法
/* function mapReduxStateToProps (state) {
	//该方法的返回值，会作为props参数传递给UI组件
	return {count:state} //此行代码相当于：<Counter count={state}>
} */
//const mapReduxStateToProps = state => ({count:state})

//从redux中把dispatch取出，以props传参的形式给UI组件
/* const mapReduxMethodToProps = dispatch => ({
	increment: value =>  dispatch(increment(value)), //<Counter increment={操作状态的方法}>
	decrement: value =>  dispatch(decrement(value)) //<Counter decrement={操作状态的方法}>
})//该方法的返回值，会作为props参数传递给UI组件 */


/* 
	1.如下代码会生成一个容器组件
	2.会映射redux中所保存的状态/为props
	3.会建立与UI组件(counter)的联系
*/
//export default connect(mapReduxStateToProps,mapReduxMethodToProps)(Counter) //完整写法
export default connect(
	state => ({count:state}), //映射状态为props
	{increment,decrement}
	/* dispatch => ({
		increment: value =>  dispatch(increment(value)), //映射dispatch为props--作为加
		decrement: value =>  dispatch(decrement(value)) //映射dispatch为props--作为减
	}) */
)(Counter)

//伪代码，模拟connect方法的逻辑
/* function connect(a,b){
	//如果b为对象，那么执行下面的逻辑，例如：{increment:increment}
	let resultObj = {} // 
	for (let key in b){
		resultObj[key] = value =>  dispatch(key(value))
	} 
}*/



