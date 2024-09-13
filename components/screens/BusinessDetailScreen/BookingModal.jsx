import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Colors from './../../../Utills/Colors';
import Heading from './../../Heading';
import moment from 'moment';
import GlorbalApi from './../../../Utills/GlorbalApi';
import { useUser } from '@clerk/clerk-expo';

export default function BookingModal({ businessId, hideModal }) {
  const [myTimeList, setTimeList] = useState([]);
  const [mySelectedTime, setSelectedTime] = useState('');
  const [mySelectedDate, setSelectedDate] = useState(null);
  const [myNote, setNote] = useState('');
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    let timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' });
      timeList.push({ time: i + ':30 AM' });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({ time: i + ':00 PM' });
      timeList.push({ time: i + ':30 PM' });
    }
    setTimeList(timeList);
  };

  const CreateNewBooking = () => {

    if (!mySelectedDate || !mySelectedTime) {
      ToastAndroid.show('Please select date and time!', ToastAndroid.LONG);
      return;
    }
    const inputData = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      time: mySelectedTime,
      date: moment(mySelectedDate).format('DD-MMM-YYYY'),
      businessId: businessId,
    };
    GlorbalApi.createBooking(inputData).then(resp => {
      console.log('Resp values', resp);
      ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG);
      hideModal();
    }).catch(error => {
      console.error('Error creating booking:', error);
      ToastAndroid.show('Error creating booking', ToastAndroid.LONG);
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 20 }} onPress={() => hideModal()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>Booking</Text>
        </TouchableOpacity>

        {/* Calendar */}
        <Heading text={'Select Date'} />
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            minDate={Date.now()}
            markedDates={{
              [mySelectedDate]: { selected: true, selectedColor: Colors.PRIMARY }
            }}
            theme={{
              todayTextColor: Colors.BLACK,
              selectedDayBackgroundColor: Colors.PRIMARY,
              selectedDayTextColor: Colors.WHITE
            }}
          />
        </View>

        {/* Time selection section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={'Select Time Slot'} />
          <FlatList
            data={myTimeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                <Text style={mySelectedTime === item.time ? styles.selectedTime : styles.unSelectedTime}>{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={'Provide if any suggestions'} />
          <TextInput onChangeText={setNote} placeholder='Note' style={styles.inputTextNote} numberOfLines={4} multiline={true} scrollEnabled={true} />
        </View>

        {/* Confirmation Button */}
        <TouchableOpacity style={{ marginTop: 15 }} onPress={CreateNewBooking}>
          <Text style={styles.confirmBtn}>Confirm Booking</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },
  inputTextNote: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: 'top',
    padding: 15,
    fontSize: 16,
    fontFamily: 'outfit-regular',
    borderColor: Colors.PRIMARY,
  },
  confirmBtn: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
