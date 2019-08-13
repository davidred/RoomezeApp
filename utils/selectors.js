import pluralize from 'pluralize'

export function getIncluded(included) {
  const entities = {}

  included.map((item) => {
    const key = pluralize(item.type)
    if(entities[key]) {
      entities[pluralize(key)].push(item)
    } else {
      entities[pluralize(key)] = [item]
    }
  })

  return entities
}

export function normalizeIncluded(includedData = []) {
  const entities = {}

  includedData.map(item => {
    const key = pluralize(item.type)
    if (entities[key]) {
      entities[key]['allIds'].add(item.id)
      entities[key]['byId'][item.id] = item
    } else {
      entities[key] = {
        byId: {
          [item.id]: item
        },
        allIds: new Set([item.id])
      }
    }
  })

  return entities
}

export function normalizeData (jsonData = []) {
  const byId = {}
  const allIds = new Set([])

  jsonData.map((item) => {
    byId[item.id] = item
    allIds.add(item.id)
  })

  return {
    byId,
    allIds,
  }
}

export function mainImage (item, images) {
  return item.relationships.images.data.map(imageData => images.byId[imageData.id]).find(image => image.attributes.image_type === 'main')
}

export function propertySelector(property, { buildings, images, addresses, rooms, neighborhoods, users }) {
  const building = buildings.filter((building) => property.relationships.building.data.id === building.id)[0]
  const address = addresses.filter((address) => building.relationships.address.data.id === address.id)[0]
  const neighborhood = neighborhoods.filter((neighborhood) => address.relationships.neighborhood.data.id === neighborhood.id)[0]
  const propertyRooms = rooms.filter((room) => property.relationships.rooms.data.map((room) => room.id).includes(room.id))
  // const roomsWithUsers = propertyRooms.filter((room) => room.relationships.user.data !== null)
  // const usersInRooms = users.filter(roomsWithUsers.map((room) => room.relationships.user.data.id).includes(user.id))

  const propertyAttributes = {
    building,
    address,
    neighborhood,
    images: images.filter((image) => property.relationships.images.data.map((data) => data.id).includes(image.id)),
    rooms: propertyRooms,
    users,
  }

  return propertyAttributes
}
