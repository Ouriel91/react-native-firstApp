import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Map from './screens/Map';
import MyCamera from './screens/MyCamera';
import { useFonts } from 'expo-font';
import {Provider} from 'react-redux'
import { Store } from './redux/store';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Stack = createStackNavigator()

function App() {
 
  //notification initial
  useEffect(() => {
    registerForPushNotification().then(token=>console.log(token));
  }, []) 

  async function registerForPushNotification(){
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if (status != 'granted'){
      const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    }

    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token
  }

  //font initial
  const [loaded] = useFonts({
    'DancingScript-Regular': require('./assets/fonts/DancingScript-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff'
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="MyCamera"
            component={MyCamera}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App