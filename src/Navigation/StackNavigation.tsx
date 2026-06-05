import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../Screens/Auth/Login';
import MyAccount from '../Screens/Root/MyAccount';
import TabComponent from './TabNavigation';
import MyProfile from '../Screens/Root/MyProfile';
import Signup from '../Screens/Auth/Signup';
import ForgetPassword from '../Screens/Auth/ForgetPassword';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabComponent} />
      <Stack.Screen name="Account" component={MyAccount} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />



    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})
