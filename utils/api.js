export function fetchProperties() {
  const endpoint = 'https://www.roomeze.com/api/properties?include[]=rooms.user&include[]=images&include[]=building.address.neighborhood&filter[display]=true&filter[available]=true.json'

  return fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => {
      debugger;
    })
}
