const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES'
import { indexProperties } from '../utils/api'
import { normalizeData } from '../utils/selectors'

export const fetchProperties = () => dispatch => {
  return indexProperties().then(({ data, included, meta }) => {
    dispatch(receiveProperties(normalizeData(data)))
  })
}

export function receiveProperties (properties) {
  return {
    type: RECEIVE_PROPERTIES,
    properties,
  }
}

function properties (state = {}, action) {
  switch (action.type) {
    case RECEIVE_PROPERTIES :
      return {
        ...state,
        ...action.properties,
      }
    default :
      return state
  }
}

export default properties
