export function indexProperties() {
  const endpoint = 'https://www.roomeze.com/api/properties?include[]=rooms.user.images&include[]=images&include[]=building.address.neighborhood&filter[display]=true&filter[available]=true.json'

  return fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => {
      debugger;
    })
}

export function fetchAll(endpoint) {
  return fetch(endpoint)
    .then(res => res.json())
    .catch(err => {
      debugger
    })
}
