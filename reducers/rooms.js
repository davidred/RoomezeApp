const RECEIVE_ROOMS = 'RECEIVE_ROOMS'

export function receiveRooms (rooms) {
  return {
    type: RECEIVE_ROOMS,
    rooms,
  }
}

function rooms (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ROOMS :
      return {
        ...state,
        ...action.rooms,
      }
    default :
      return state
  }
}

export default rooms
