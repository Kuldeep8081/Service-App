import { View, Text,StyleSheet,FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from './../../../Utills/GlorbalApi'
import Heading from './../../Heading'
export default function Slider() {
    const [myslider,setSlider]=useState([])
    useEffect(()=>{
        getSliders();
    },[])

    const getSliders=()=>{
        GlobalApi.getSlider().then(resp=>{
            setSlider(resp?.sliders)
        })
    }
  return (
    <View>

      <Heading text={'Offers For You'}/>

      <FlatList 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={myslider}
      renderItem={({item,index})=>(
        <View style={{marginRight:10}}>
          <Image source={{uri:item?.image?.url}}
          style={styles.sliderImage}/>
        </View>
      )}
      />
    </View>
  )
}

const styles=StyleSheet.create({
  sliderImage:{
    width:210,
    height:130,
    borderRadius:40,
    objectFit:'contain'
  }
})