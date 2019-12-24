import {SAVE_TITLE} from '../action_types'

//保存标题
export const saveMenuTitle = (value)=> {
	return {type:SAVE_TITLE,data:value}
}