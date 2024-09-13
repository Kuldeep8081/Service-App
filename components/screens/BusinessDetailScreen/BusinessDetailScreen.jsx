import { View, Text, Image, TouchableOpacity, StyleSheet ,ScrollView, Modal  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from './../../../Utills/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import Heading from './../../Heading';
import BusinessAboutMe from './BusinessAboutMe'
import BookingModal from './BookingModal'
export default function BusinessDetailScreen() {

  const param = useRoute().params;
  const [business, setBusiness] = useState(param?.business)
  const [showModal,setShowModal]=useState(false)
  const navigation = useNavigation();

  return (
    <View>
    <ScrollView style={{height:'88%' }}>
      <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.goBack()}>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 50 }}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </View>
      </TouchableOpacity>
      <Image source={{ uri: business?.images[0]?.url }}
        style={{ width: '100%', height: 300 }} />

      <View style={styles.infoContainer}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>{business?.name}</Text>

        <View style={styles.subContainer}>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: Colors.PRIMARY }} >{business?.contactPerson}</Text>
          <Text style={{ fontFamily: 'outfit-regular', color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, fontSize: 14, padding: 5, borderRadius: 5 }}>{business?.category?.name}</Text>
        </View>

        <Text style={{ fontSize: 17, fontFamily: 'outfit-regular', color: Colors.GRAY }}> <FontAwesome6 name="location-dot" size={24} color={Colors.PRIMARY} /> {business?.address}</Text>

        <View style={{ borderWidth: 0.4, color: Colors.GRAY, marginTop: 20, marginBottom: 20 }}></View>

        <BusinessAboutMe/>

    </View>
    </ScrollView>
        <View style={{
          display:'flex',
          flexDirection:'row',
          margin:5,
          gap:8
        }}>
          <TouchableOpacity style={styles.messageBtn}>
            <Text style={{fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:18,textAlign:'center'}}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookingBtn} onPress={()=>setShowModal(true)}>
            <Text style={{fontFamily:'outfit-medium',color:Colors.WHITE,fontSize:18,textAlign:'center'}}>Book Now</Text>
          </TouchableOpacity>
        </View>

  <Modal
   animationType='slide' 
   visible={showModal}
  >
   <BookingModal business={business.id} hideModal={()=>setShowModal(false)}/>
  </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7
  },
  backArrowContainer: {
    position: 'absolute',
    zIndex: 1,
    padding: 20
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  messageBtn:{
    backgroundColor:Colors.WHITE,
    borderColor:Colors.PRIMARY,
    padding:15,
    borderRadius:99,
    borderWidth:1,
    flex:1
  },
  bookingBtn:{
    backgroundColor:Colors.PRIMARY,
    borderColor:Colors.PRIMARY,
    padding:15,
    borderRadius:99,
    borderWidth:1,
    flex:1
  }
})