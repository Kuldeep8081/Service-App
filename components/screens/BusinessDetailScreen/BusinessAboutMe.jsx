//rnfs

import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import Colors from './../../../Utills/Colors'
import Heading from './../../Heading'
export default function BusinessAboutMe() {
    const param=useRoute().params;
    const [business, setBusiness] = useState(param?.business)
    const [isReadMore, setIsReadMore] = useState(false);
  return(
    <View>
    <Heading text={"About Me"} />
    <Text style={{ fontFamily: 'outfit-regular', color: Colors. GRAY, lineHeight: 28, fontSize: 16 }} numberOfLines={isReadMore ? 20 : 4}>{business?.about}</Text>
     
    <TouchableOpacity onPress={() => setIsReadMore(isReadMore?false:true)}>
      <Text style={{ fontFamily: 'outfit-regular', color: Colors.PRIMARY, fontSize: 16 }}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
    </TouchableOpacity>
   </View>
  )
}

const styles = StyleSheet.create({})