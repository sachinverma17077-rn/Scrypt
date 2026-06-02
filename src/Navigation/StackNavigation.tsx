import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Login from '../Screens/Auth/Login';
import MyAccount from '../Screens/Root/MyAccount';
import TabComponent from './TabNavigation';
import MessageLogs from '../Screens/Root/MessageLogs';
import MyProfile from '../Screens/Root/MyProfile';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabComponent} />
        <Stack.Screen name='Account' component={MyAccount} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='MessageLogs' component={MessageLogs} />
         <Stack.Screen name='MyProfile' component={MyProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})