import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen, RegisterScreen } from '../modules/auth';
import {
  LandingScreen,
  SettingScreen,
  ChatScreen,
  StartScreen,
} from '../modules/home';

import { BottomNavigator } from '../components';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const { Navigator, Screen } = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    database()
      .ref('users')
      .child(auth().currentUser.uid)
      .child('name')
      .once('value', snapshot => {
        setName(snapshot.val());
      });
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Landing" component={LandingScreen} />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        initialParams={{ name: name }}
      />
    </Tab.Navigator>
  );
};

const Router = ({ initialRouteName }) => {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      initialRouteName={initialRouteName}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="Home" component={Home} />
      <Screen name="Start" component={StartScreen} />
      <Screen name="Chat" component={ChatScreen} />
    </Navigator>
  );
};

export default Router;
