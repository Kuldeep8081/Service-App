import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from './../App/HomeScreen'
import BusinessListByCategoryScreen from './../screens/BusinessListByCategoryScreens/BusinessListByCategoryScreen';
import BusinessDetailScreen from './../screens/BusinessDetailScreen/BusinessDetailScreen'
const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false,
        }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="business_list" component={BusinessListByCategoryScreen} />
      <Stack.Screen name="business_detail" component={BusinessDetailScreen} />
      
    </Stack.Navigator>
  )
}