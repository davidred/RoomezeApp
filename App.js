import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import Provider from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import Constants from 'expo-constants'
import Properties from './components/Properties'
import rootReducer from './reducers/root_reducer'

// FOR TESTING
import { fetchProperties } from './components/Properties/reducer'

const store = createStore(rootReducer, state = {}, applyMiddleware(thunk, logger))
window.fetchProperties = fetchProperties
window.store = store

function RoomezeStatusBar() {
  return(
    <View style={{height: Constants.statusBarHeight, backgroundColor: 'skyblue'}}>
      <StatusBar backgroundColor="powderblue" barStyle="light-content" color="#bbb" />
    </View>
  )
}

export default function App() {
  return (
    // <Provider store={ store }>
      <View style={{flex: 1}}>
        <RoomezeStatusBar />
        <Properties />
      </View>
    // </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
