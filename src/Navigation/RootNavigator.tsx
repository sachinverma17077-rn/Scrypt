// RootNavigator.js

import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import StackNavigation from './StackNavigation'; // Auth Screens
import MainNavigation from './MainNavigation';   // Main App Screens

export default function RootNavigator() {
  const isAuthenticated = useSelector(
    state => state.auth.isAuthenticated
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainNavigation />
      ) : (
        <StackNavigation />
      )}
    </NavigationContainer>
  );
}