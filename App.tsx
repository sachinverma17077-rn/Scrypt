import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from './src/Redux/store';
import RootNavigator from './src/Navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;