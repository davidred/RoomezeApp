const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    default :
      return state
  }
}

export default users
