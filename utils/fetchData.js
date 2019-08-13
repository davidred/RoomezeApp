
import pathHelper from './pathHelper'
import { fetchAll } from './api'
import { normalizeData, normalizeIncluded } from './selectors'
import { receiveProperties } from '../reducers/properties'
import { receiveUsers } from '../reducers/users'
import { receiveRooms } from '../reducers/rooms'
import { receiveBuildings } from '../reducers/buildings'
import { receiveAddresses } from '../reducers/addresses'
import { receiveNeighborhoods } from '../reducers/neighborhoods'
import { receiveImages } from '../reducers/images'

const actions = {
  receive: {
    'properties': receiveProperties,
    'users': receiveUsers,
    'rooms': receiveRooms,
    'buildings': receiveBuildings,
    'addresses': receiveAddresses,
    'neighborhoods': receiveNeighborhoods,
    'images': receiveImages,
  }
}

export const fetchAllEntities = (entity) => dispatch => {
  return fetchAll(pathHelper.api[entity].index).then(({ data, included, meta }) => {
    const includedEntities = normalizeIncluded(included)
    Object.keys(includedEntities).map(includedEntity => {
      if (actions.receive[includedEntity]) {
        dispatch(actions.receive[includedEntity](includedEntities[includedEntity]))
      }
    })

    dispatch(actions.receive[entity](normalizeData(data)))
  })
}
