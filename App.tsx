import React from 'react';
import TabNavigation from './src/Navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  <NavigationContainer>
    <TabNavigation />
  </NavigationContainer>
</GestureHandlerRootView>
  );
};

export default App;
