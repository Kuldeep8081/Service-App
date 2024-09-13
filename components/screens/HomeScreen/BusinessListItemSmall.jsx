import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import Colors from './../../../Utills/Colors'

export default function BusinessListItemSmall({business}) {
  return (
      <View style={styles.container}>
        <View style={{padding:10,}}>
      <Image source={{uri:business?.images[0]?.url}}
      style={styles.imageView}
      />
      <View style={styles.infoContainer}>
        <Text style={{fontSize:17,fontFamily:'outfit-medium'}}>{business?.name}</Text>
        <Text style={{fontSize:13,fontFamily:'outfit-regular',color:Colors.GRAY}}>{business?.contactPerson}</Text>
        <Text style={
          {
            fontFamily:'outfit-regular',
            fontSize:10,
            padding:3,
            color:Colors.PRIMARY,
            backgroundColor:Colors.PRIMARY_LIGHT,
            alignSelf:'flex-start',
            paddingHorizontal:7,
            borderRadius:4
          }
          }>{business?.category?.name}</Text>
      </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        borderRadius:10,
        marginRight:10
    },
   imageView:{
    width:160,
    height:100,
    borderRadius:10,
   },
   infoContainer:{
    display:'flex',
    padding:7,
    gap:3
   }
})