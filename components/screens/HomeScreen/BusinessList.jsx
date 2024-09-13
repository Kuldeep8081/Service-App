//rnf
import { View, Text,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from './../../../components/Heading'
import GlobalApi from './../../../Utills/GlorbalApi'
import BusinessListItemSmall from './BusinessListItemSmall'

export default function BusinessList() {
    const [myBusinessList,setBusinessList]=useState([])
    useEffect(()=>{
        getBusinessList();
    },[])
    const getBusinessList=()=>{
        GlobalApi.getBusinessList().then(resp=>{
            setBusinessList(resp.businesses)
        })
    }
  return (
    <View style={{}}>
      <Heading text={'Latest Businesses'} isViewAll={true}/> 

      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={myBusinessList}
      renderItem={({item,index})=>(
        <View>
            <BusinessListItemSmall business={item}/>
        </View>
      )}
      />
    </View>
  )
}