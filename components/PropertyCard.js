import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { white } from '../utils/colors'
import { mainImage } from '../utils/selectors'

function RoommateAvatar ({ room, users, images }) {
  if (room.relationships.user.data === null) {
    return <Image style={styles.avatar} source={require('../assets/empty-user.png')} />
  } else {
    let user = users.byId[room.relationships.user.data.id]
    let image
    if (user.relationships.images.data.length !== 0) {
      image = mainImage(user, images)
    }

    if (image) {
      return <Image style={styles.avatar} source={{uri: image.attributes.full_url}}/>
    } else {
      return <Image style={styles.avatar} source={require('../assets/empty-user.png')} />
    }
  }
}

export default class PropertyCard extends React.Component {
  formatAddress = (address) => {
    return `${address.street_number} ${address.street_1}`
  }

  priceRange = (rooms) => {
    const roomPrices = rooms.map((room) => parseInt(room.attributes.price))
    return [Math.min(...roomPrices), Math.max(...roomPrices)]
  }

  render() {
    const { property, address, neighborhood, images, rooms, users } = this.props
    const priceRange = this.priceRange(rooms)
    const mainPropertyImage = mainImage(property, images)

    return(
      <View style={styles.card}>
        {mainPropertyImage ? <Image style={styles.img} source={{uri: mainPropertyImage.attributes.full_url}} resizeMode='stretch'/> : null }
        <View style={{padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>{this.formatAddress(address.attributes)}</Text>
          <Text>${priceRange[0]} - ${priceRange[1]}</Text>
          <Text>
            <EvilIcons name='location' size={20} />
            {neighborhood.attributes.name}
          </Text>
          <View style={styles.roommates}>
            {rooms.map((room) => <RoommateAvatar key={room.id} room={room} images={images} users={users} />)}
          </View>
        </View>
      </View>
    )
  }
}

PropertyCard.propTypes = {
  address: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired,
  neighborhood: PropTypes.object.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  images: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
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
    borderRadius: 25,
  }
})
