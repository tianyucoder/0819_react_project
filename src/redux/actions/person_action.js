//专门用于制造action对象
import {ADDPERSON} from '../action_types'
export const addPerson = (value)=> ({type:ADDPERSON,data:value}) //分发同步action

