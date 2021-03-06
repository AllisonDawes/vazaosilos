import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#043C4E" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: '#ccc' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
