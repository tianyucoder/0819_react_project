import {SAVE_TITLE, DELETE_TITLE} from '../action_types'

//保存标题
export const saveMenuTitle = (value)=> {
	return {type:SAVE_TITLE,data:value}
}

export const deletMenuTitle = (value)=> {
	return {type:DELETE_TITLE,data:value}
}