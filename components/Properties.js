import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { fetchAllEntities } from '../utils/fetchData'

import { AppLoading } from 'expo'
import PropertyCard from './PropertyCard'

class Properties extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAllEntities('properties'))
  }

  propertyRooms = (property) => {
    const { entities: { rooms } } = this.props
    return property.relationships.rooms.data.map(roomData => rooms.byId[roomData.id])
  }

  isLoading = () => {
    const { entities: { properties } } = this.props
    return properties.allIds === undefined || properties.allIds.size === 0
  }

  render() {
    const { entities: { properties, buildings, addresses, neighborhoods, images, users } } = this.props

    if(this.isLoading()) {
      return(
        <View style={styles.center}>
          <Text style={{color: 'black'}}>Loading</Text>
        </View>
      )
    }

    const allIds = Array.from(properties.allIds)

    return(
      <ScrollView style={{flex: 1}}>
        {allIds.map(propertyId => {
          let property = properties.byId[propertyId]
          let rooms = this.propertyRooms(property)
          let building = buildings.byId[property.relationships.building.data.id]
          let address = addresses.byId[building.relationships.address.data.id]
          let neighborhood = neighborhoods.byId[address.relationships.neighborhood.data.id]
          return <PropertyCard
            key={propertyId}
            property={property}
            building={building}
            address={address}
            neighborhood={neighborhood}
            images={images}
            users={users}
            rooms={rooms} />
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps ({ entities }) {
  return {
    entities
  }
}

export default connect(mapStateToProps)(Properties)
