import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import {setName, setAge, increaseUserAge, getCities} from '../redux/actions'
import * as Notifications from 'expo-notifications';

const Home = ({navigation}) => {
      
    const {name, age, cities} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    useEffect(() => {
      getData()
      dispatch(getCities())
    },[])

    const getData = () => {
      try {
        AsyncStorage.getItem('userdata')
          .then(value => {
          if (value !== null) {
              let user = JSON.parse(value)
              dispatch(setName(user.name))
              dispatch(setAge(user.age))
             }
          })
      }
      catch (err){
        console.log(err)
      }
    }

    const updateData = async () => {
      if (name.length == 0) {
          Alert.alert('Warning!', 'Please write your data.')
      } else {
        try {
          let user = {
            name: name
          }
          await AsyncStorage.mergeItem('userdata', JSON.stringify(user));
          Alert.alert('Success!', 'Your data has been updated.');
          } catch (error) {
            console.log(error);
          }
      }
    }

    const removeData = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }

    const m_handleNotification = (item, index) => {

      Notifications.cancelAllScheduledNotificationsAsync()

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'welcome to our country ' + item.country,
          body: "Enjoy in our city " + item.city,
          id: index,  
          color: "green",
        },
        trigger: null,
      });
    }

    return (
      <View style={styles.body}>
       <Text style={[
          GlobalStyle.CustomFont,
          styles.text
        ]}>
          Welcome {name} !
        </Text>
        <CustomButton
          title="Open Camera"
          color='#0080ff'
          onPressHandler={() => { navigation.navigate('MyCamera') }}
        />
        <FlatList 
          keyExtractor={(item, index) => index.toString()}
          data={cities}
          renderItem={({ item, index }) => (
            <TouchableOpacity
            onPress={() => { 
              m_handleNotification(item, index) 
              navigation.navigate('Map', {
                city: item.city,
                lat: item.lat,
                lng: item.lng
              })
            }}
            >            
              <View style={styles.item}>
                <Text style={styles.title}>{item.country}</Text>
                <Text style={styles.subtitle}>{item.city}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> 
        <Text style={[
          GlobalStyle.CustomFont,
          styles.text
        ]}>
          Your age is {age}
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder='Enter your name'
          value={name}
          onChangeText={(value) => dispatch(setName(value))}
        />
        <CustomButton
          title='Update'
          color='#ff7f00'
          onPressHandler={updateData}
        />
        <CustomButton
          title='Remove'
          color='#f40100'
          onPressHandler={removeData}
        />
        <CustomButton
          title='Increase age'
          color='#0080ff'
          onPressHandler={() => {dispatch(increaseUserAge())}} /> 
      </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
    },
    item: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#cccccc',
        borderRadius: 5,
        margin: 7,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        margin: 10,
    },
    subtitle: {
        fontSize: 20,
        margin: 10,
        color: '#999999',
    }
  });
  
  export default Home;