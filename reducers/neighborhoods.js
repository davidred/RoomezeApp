const RECEIVE_NEIGHBORHOODS = 'RECEIVE_NEIGHBORHOODS'

export function receiveNeighborhoods (neighborhoods) {
  return {
    type: RECEIVE_NEIGHBORHOODS,
    neighborhoods,
  }
}

function neighborhoods (state = {}, action) {
  switch (action.type) {
    case RECEIVE_NEIGHBORHOODS :
      return {
        ...state,
        ...action.neighborhoods,
      }
    default :
      return state
  }
}

export default neighborhoods
