import pluralize from 'pluralize'

export function getIncluded(included) {
  entities = {}

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

export function propertySelector(property, { buildings, images, addresses, rooms, neighborhoods }) {
  const building = buildings.filter((building) => property.relationships.building.data.id === building.id)[0]
  const address = addresses.filter((address) => building.relationships.address.data.id === address.id)[0]
  const neighborhood = neighborhoods.filter((neighborhood) => address.relationships.neighborhood.data.id === neighborhood.id)[0]

  const propertyAttributes = {
    building,
    address,
    neighborhood,
    images: images.filter((image) => property.relationships.images.data.map((data) => data.id).includes(image.id)),
    rooms: rooms.filter((room) => property.relationships.rooms.data.map((room) => room.id).includes(room.id)),
  }

  return propertyAttributes
}
