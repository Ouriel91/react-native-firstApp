import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('My Tasks')
        }, 2000);
    })

    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../assets/checklist.png')}
            />
            <Text style={[styles.text, GlobalStyle.CustomFont]}>
                Todolist
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 20,
    },
    text: {
        fontSize: 40,
        color: '#ffffff',
    },
})

export default Splash