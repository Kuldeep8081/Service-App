import { View, Text ,StatusBar} from 'react-native'
import React from 'react'
import Header from '../screens/HomeScreen/Header'
import Slider from '../screens/HomeScreen/Slider'
import Categories from '../screens/HomeScreen/Categories'
import BusinessList from '../screens/HomeScreen/BusinessList'
export default function HomeScreen() {
  return (
    <View style={{}}>
      <Header/>
      <View style={{padding:10}}>
        <Categories/>
        <BusinessList/>
        <Slider/>
      </View>
    </View>
  )
}