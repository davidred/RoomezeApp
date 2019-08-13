const RECEIVE_ADDRESSES = 'RECEIVE_ADDRESSES'

export function receiveAddresses (addresses) {
  return {
    type: RECEIVE_ADDRESSES,
    addresses,
  }
}

function addresses (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ADDRESSES :
      return {
        ...state,
        ...action.addresses,
      }
    default :
      return state
  }
}

export default addresses
