import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import GlorbalApi from '../../Utills/GlorbalApi'
import { useUser } from '@clerk/clerk-expo'
export default function BookingScreen() {

  const user=useUser();
  useEffect(()=>{
    getUserbookings();
  },[])
  const getUserbookings=()=>{
      GlorbalApi.getUserBookings().then(resp=>{
          console.log("the resp is ",resp);
      })
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'outfit-medium',fontSize:26}}>My Bookings</Text>
    </View>
  )
}