import { combineReducers } from 'redux'
import properties from '../components/Properties/reducer'

const rootReducer = combineReducers({
  properties,
})

export default rootReducer
