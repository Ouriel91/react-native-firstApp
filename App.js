import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ToDo from './screens/ToDo';
import Done from './screens/Done';
import Splash from './screens/Splash';
import MyCamera from './screens/MyCamera';
import Task from './screens/Task';
import { useFonts } from 'expo-font';
import {Provider} from 'react-redux'
import { Store } from './redux/store';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'To-Do') {
              iconName = 'clipboard-list';
              size = focused ? 25 : 20;
            } else if (route.name === 'Done') {
              iconName = 'clipboard-check';
              size = focused ? 25 : 20;
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })
      }
    >
      <Tab.Screen name={'To-Do'} component={ToDo} />
      <Tab.Screen name={'Done'} component={Done} />
    </Tab.Navigator>
  );
}

function App() {

  //notifications initial
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
          initialRouteName="Splash"
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
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="My Tasks"
            component={HomeTabs}
          />
          <Stack.Screen
            name="MyCamera"
            component={MyCamera}
          />
          <Stack.Screen
            name="Task"
            component={Task}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App