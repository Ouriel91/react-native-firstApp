import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
} from 'react-native';
import CustomButton from '../utils/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux';
import {setName, setAge} from '../redux/actions'
import PushNotification from "react-native-push-notification"

const Login = ({navigation}) => {

    const {name, age} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        try {
            AsyncStorage.getItem('userdata')
                .then((data) => {
                    if(data !== null) {
                        navigation.navigate('Home')
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    const setData = async() => {
        if (name.length === 0 || age.length === 0) {
            Alert.alert('Warning!', 'Please write your data.')
        }
        else{
            try {
                dispatch(setName(name))
                dispatch(setAge(age))
                let user = {
                    name: name,
                    age: age
                }
                await AsyncStorage.setItem('userdata', JSON.stringify(user))
                navigation.navigate('Home')
            }
            catch(error){
                console.log(error)
            }
        }
    }
    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../assets/asyncstorage.png')}
            />
            <Text style={styles.text}>
                Async Storage
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => dispatch(setName(value))}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value) => dispatch(setAge(value))}
            />
            <CustomButton
                title='Login'
                color='#1eb900'
                onPressHandler={setData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 130,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})

export default Login