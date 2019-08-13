import { combineReducers } from 'redux'
import properties from './properties'
import rooms from './rooms'
import addresses from './addresses'
import buildings from './buildings'
import users from './users'
import neighborhoods from './neighborhoods'
import images from './images'

const entities = combineReducers({
  properties,
  rooms,
  addresses,
  buildings,
  users,
  neighborhoods,
  images,
})

export default entities
