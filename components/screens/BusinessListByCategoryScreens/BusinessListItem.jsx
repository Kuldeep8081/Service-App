import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './../../../Utills/Colors'
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business}) {
  const navigation=useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business_detail' ,{business:business})}>
      <Image source={{uri:business?.images[0]?.url}}
      style={styles.image}
      />
      <View style={styles.subContainer}>
        <Text style={{fontFamily:'outfit-regular',color:Colors.GRAY,fontSize:15}}>{business.contactPerson}</Text>
        <Text style={{fontFamily:'outfit-bold',fontSize:19}}>{business.name}</Text>
        <Text style={{fontFamily:'outfit-regular',color:Colors.GRAY,fontSize:16}}>
        <FontAwesome6 name="location-dot" size={24} color={Colors.PRIMARY} />  {business.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
     marginTop:15,
      backgroundColor:Colors.WHITE,
      padding:5,
      borderRadius:15,
      display:'flex',
      flexDirection:'row',
      gap:10
  },
  subContainer:{
      display:'flex',
      gap:10
  },
  image:{
        width:100,
        height:100,
        borderRadius:15
  }
})