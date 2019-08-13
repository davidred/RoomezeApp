const RECEIVE_BUILDINGS = 'RECEIVE_BUILDINGS'

export function receiveBuildings (buildings) {
  return {
    type: RECEIVE_BUILDINGS,
    buildings,
  }
}

function buildings (state = {}, action) {
  switch (action.type) {
    case RECEIVE_BUILDINGS :
      return {
        ...state,
        ...action.buildings,
      }
    default :
      return state
  }
}

export default buildings
