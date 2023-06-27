import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Modal,
  Text,
  Image,
  Pressable,
  Dimensions,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import RenderStudiosItem from './RenderStudiosItem';
import { View } from 'native-base';
import { Calendar, ExpandableCalendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import { Colors, Fonts } from '@common';
import moment from 'moment';

function Filter() {
  const studio = useSelector((state) => state.studio);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [isDateSelected, setDateSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const screenWidth = Dimensions.get('screen').width;

  const onDateSelect = (date) => {
    setDate(date.dateString);
    setOpen(!open)
  };
  const closeModal = () => {
    setOpen(!open)
  };
  return (
    <View style={{flex:1}}>
      <Pressable
        onPress={() => {
          setOpen(true);
        }}
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          borderColor: 'grey',
          borderWidth: 1,
          width: '87%',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
          height: 50,
          borderRadius: 5,
        }}>
        <View
          style={{
            width: '100%',
            alignContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              width: '87%',
              lineHeight: 45,
              color: 'white',
              marginStart: 15,
              textAlignVertical: 'center',
              alignItems: 'center',
              color: Colors.white,
              fontFamily: Fonts.type.semiBold,
              fontSize: Fonts.size.medium,
            }}>
            {date
              ? moment(new Date(date)).format('DD/MM/yyyy')
              : 'Select date'}
          </Text>

          <Image
            style={{ height: 20, width: 20, alignSelf: 'center' }}
            source={require('../../../assets/down_arrow.png')}></Image>
        </View>
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setOpen(!open);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(1,1,1,0.5)',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 20,
              alignSelf: 'center',

              paddingBottom: 10,
              width: screenWidth * 0.8,
              backgroundColor: 'white',
              elevation: 5,
            }}>
            <View
              style={{
                width: screenWidth * 0.77,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                padding: 5,

                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  marginLeft: 7,
                }}>
                Select Date
              </Text>
              <Pressable
                onPress={() => {
                  setOpen(false);
                  setDate(selectDateObject);
                }}>
                <Image
                  source={require('../../../assets/down_arrow.png')}
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    marginRight: 2,
                  }}
                />
              </Pressable>
            </View>

            {/* <DatePicker
              mode="date"
              minimumDate={new Date()}
              open={open}
              date={date}
              style={{
                borderRadius: 20,
                alignSelf: 'center',
                height: 250,
                width: 300,
              }}
              textColor="#000000"
              onDateChange={(date) => {
                //dateToken(Moment(new Date(date)).format('MM/DD/yyyy'));
                //getDate(Moment(new Date(date)).format('YYYY-MM-DD'));

                setDate(date);
              }}
            /> */}

            <Calendar
              onDayPress={onDateSelect}
              markedDates={{
                [date]: { selected: true, marked: true, selectedColor: 'black' },
              }}
            />
            <Pressable
              onPress={() => {
                // console.log(
                //   'datef',
                //   moment(new Date(date)).format('MM/DD/yyyy'),
                // );
                setOpen(false);
              }}
              style={{
                height: 30,
                width: 80,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                alignItems: 'center',
                marginRight: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Close
              </Text>
            </Pressable>

            {/* <Pressable
              onPress={() => {
                console.log(
                  'datef',
                  moment(new Date(date)).format('MM/DD/yyyy'),
                );

                setOpen(false);
              }}
              style={{
                height: 35,
                width: 100,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                alignItems: 'center',
                marginRight: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Done
              </Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>

      <FlatList
        data={studio.studios}
        style={styles.container}
        renderItem={({ item }) => <RenderStudiosItem item={item} />}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  footer: {
    height: 24,
  },
});

export default Filter;
