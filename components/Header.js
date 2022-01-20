import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const Header = (props) => {

    return (
        <View style={styles.view}>
          <Text style={styles.text}>React Native</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  view: {
    width:'100%',
    height: 50,
    backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
      fontSize: 25,
      fontWeight:'bold',
      color:'#ffffff'
  }
})

export default Header 