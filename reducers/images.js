const RECEIVE_IMAGES = 'RECEIVE_IMAGES'

export function receiveImages (images) {
  return {
    type: RECEIVE_IMAGES,
    images,
  }
}

function images (state = {}, action) {
  switch (action.type) {
    case RECEIVE_IMAGES :
      return {
        ...state,
        ...action.images,
      }
    default :
      return state
  }
}

export default images
