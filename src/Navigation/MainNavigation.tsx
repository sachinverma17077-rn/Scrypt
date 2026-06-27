import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../Screens/Auth/Login';
import MyAccount from '../Screens/Root/MyAccount';
import TabComponent from './TabNavigation';
import MyProfile from '../Screens/Root/MyProfile';
import Signup from '../Screens/Auth/Signup';
import ForgetPassword from '../Screens/Auth/ForgetPassword';
import EditProfile from '../Screens/Root/MyAccountTab/EditProfile';
import Privacy from '../Screens/Root/MyAccountTab/Privacy';
import NotificationSettings from '../Screens/Root/MyAccountTab/NotificationSettings';
import Security from '../Screens/Root/MyAccountTab/Security';
import Appearance from '../Screens/Root/MyAccountTab/Appearance';
import HelpSupport from '../Screens/Root/MyAccountTab/HelpSupport';
import Notification from '../Screens/Root/Notification';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Home" component={TabComponent} />
  <Stack.Screen name="Account" component={MyAccount} />
  <Stack.Screen name="MyProfile" component={MyProfile} />
  <Stack.Screen name="EditProfile" component={EditProfile} />
  <Stack.Screen name="Privacy" component={Privacy} />
  <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
  <Stack.Screen name="Security" component={Security} />
  <Stack.Screen name="Appearance" component={Appearance} />
  <Stack.Screen name="HelpSupport" component={HelpSupport} />
  <Stack.Screen name="Notification" component={Notification} />
  
</Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})
