import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import Properties from './components/Properties'
import Constants from 'expo-constants'

function RoomezeStatusBar() {
  return(
    <View style={{height: Constants.statusBarHeight, backgroundColor: 'skyblue'}}>
      <StatusBar backgroundColor="powderblue" barStyle="light-content" color="#bbb" />
    </View>
  )
}

export default function App() {
  return (
    <View style={{flex: 1}}>
      <RoomezeStatusBar />
      <Properties />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
