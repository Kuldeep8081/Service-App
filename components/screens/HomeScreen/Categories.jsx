import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Heading from './../../Heading';
import GlobalApi from './../../../Utills/GlorbalApi';
import Colors from './../../../Utills/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
  const [myCategories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const resp = await GlobalApi.getCategories();
      setCategories(resp?.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={'All Categories'} isViewAll={true} />

      <FlatList
        data={myCategories}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <TouchableOpacity
              style={styles.mainIconContainer}
              onPress={() => navigation.push('business_list', { category: item.name })}
            >
              <View style={styles.iconContainer}>
                <Image source={{ uri: item?.icon?.url }} style={{ width: 30, height: 30 }} />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 7,
    borderRadius: 99,
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'outfit-medium',
    marginTop: 5,
  },
});
