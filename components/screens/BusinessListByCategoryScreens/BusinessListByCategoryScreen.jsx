import { View, Text,StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import GlorbalApi from './../../../Utills/GlorbalApi';
import BusinessListItem from './BusinessListItem'
import Colors from './../../../Utills/Colors';

export default function BusinessListByCategoryScreen() {
    const [myBusinessList, setBusinessList] = useState([]);
    const navigation = useNavigation();
    const { params } = useRoute();
    const { category } = params;
  
    useEffect(() => {
      if (category) {
        getBusinessByCategory();
      }
    }, [category]);
  
    const getBusinessByCategory = async () => {
      try {
        const resp = await GlorbalApi.getBusinessListByCategory(category);
        setBusinessList(resp.businesses);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
  
        {myBusinessList?.length > 0 ? (
          <FlatList
            data={myBusinessList}
            renderItem={({ item }) => <BusinessListItem business={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.noBusinessText}>No Business Found</Text>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 25,
      fontFamily: 'outfit-medium',
      marginLeft: 10,
    },
    noBusinessText: {
      fontSize: 20,
      fontFamily: 'outfit-medium',
      textAlign: 'center',
      marginTop: '20%',
      color: Colors.GRAY,
    },
  });