import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from './src/Redux/store';
import RootNavigator from './src/Navigation/RootNavigator';
import GlobalToast from './src/Backend/GlobalToast';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
 useEffect(() => {
  const timer = setTimeout(() => {
    SplashScreen.hide();
  }, 3000);

  return () => clearTimeout(timer);
}, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </PersistGate>
        <GlobalToast />
    </Provider>
  );
};

export default App;