import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { receiveProperties } from './reducer'
import { indexProperties } from '../../utils/api'
import { getIncluded, propertySelector } from '../../utils/selectors'
import { AppLoading } from 'expo'
import Property from '../Property'

export default class Properties extends React.Component {
  state = {
    entities: {
      properties: [],
      rooms: [],
      neighborhoods: [],
      users: [],
      images: [],
      buildings: [],
      addresses: [],
    }
  }

  componentDidMount() {
    indexProperties()
      .then(({ data, included }) => {
        const includedEntities = getIncluded(included)

        this.setState(({ entities }) => ({
          entities: {
            properties: data,
            ...includedEntities,
          },
        }))
      })
      .catch((err) => {
        debugger;
      })
  }

  isLoading = () => {
    const { entities: { properties } } = this.state
    return properties.length === 0
  }

  render() {
    const { entities } = this.state

    if(this.isLoading()) {
      return(
        <View style={styles.center}>
          <Text>Loading</Text>
        </View>
      )
    }
    
    return(
      <ScrollView style={{flex: 1}}>
        {entities.properties.map((property) => {
          const propertyAttrs = propertySelector(property, entities)

          return <Property key={property.id} property={property} {...propertyAttrs} />
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
