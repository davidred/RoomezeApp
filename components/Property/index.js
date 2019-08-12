import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { white } from '../../utils/colors'

export default class Property extends React.Component {
  formatAddress = (address) => {
    return `${address.street_number} ${address.street_1}`
  }

  priceRange = (rooms) => {
    const roomPrices = rooms.map((room) => parseInt(room.attributes.price))
    return [Math.min(...roomPrices), Math.max(...roomPrices)]
  }

  mainImage = (images) => {
    return images && images.filter((images) => images.attributes.image_type === 'main')[0]
  }

  roommateImage = (room, images) => {
    if (room.relationships.user.data === null) {
      return <Image key={room.id} style={styles.avatar} source={require('../../assets/empty-user.png')}/>
    } else {
    }
  }

  render() {
    const { property, building, address, neighborhood, images, rooms } = this.props
    const priceRange = this.priceRange(rooms)
    const mainImage = this.mainImage(images)

    return(
      <View style={styles.card}>
        {mainImage ? <Image style={styles.img} source={{uri: mainImage.attributes.full_url}} resizeMode='stretch'/> : null }
        <View style={{padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>{this.formatAddress(address.attributes)}</Text>
          <Text>${priceRange[0]} - ${priceRange[1]}</Text>
          <Text>
            <EvilIcons name='location' size={20} />
            {neighborhood.attributes.name}
          </Text>
          <View style={styles.roommates}>
            {rooms.map((room) => (this.roommateImage(room, images)))}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'flex-start',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  img: {
    height: 250,
    flex: 1,
  },
  roommates: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    height: 50,
    width: 50,
  }
})
