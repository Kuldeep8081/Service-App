//rnf
import { View, Text, Image, StyleSheet,TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from './../../../Utills/Colors';
import { FontAwesome } from '@expo/vector-icons';
export default function Header() {
  const { user, isLoading } = useUser();
  return user && (
    <View style={styles.container}>

      <View style={styles.profileMainContainer}>

        <View style={styles.profileContainer}>

          <Image source={{ uri: user?.imageUrl }}
            style={styles.userImage}
          />
          <View>
            <Text style={{ color: Colors.WHITE,fontFamily:'outfit-regular' }}>Welcome,</Text>
            <Text style={{ color: Colors.WHITE, fontSize: 20,fontFamily:'outfit-medium' }}>{user?.fullName}</Text>
          </View>
        </View>
        <FontAwesome name="bookmark-o" size={27} color="white" />
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput placeholder='Search' style={styles.textInput}/>
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchBtn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  profileMainContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    gap: 10
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  searchBarContainer:{
     marginTop:15,
     display:'flex',
     flexDirection:'row',
     gap:10,
     marginBottom:10
  },
  textInput:{
    backgroundColor:Colors.WHITE,
    padding:7,
    paddingHorizontal:16,
    borderRadius:8,
    width:'85%',
    fontSize:18,
    fontFamily:'outfit-regular'
  },
  searchBtn:{
    backgroundColor:Colors.WHITE,
    padding:10,
    borderRadius:8
  }
})