import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConfigParams from '../pages/ConfigParams';
import Calculator from '../pages/Calculator';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#144D5E'}
    }}>
    <App.Screen name="Calculator" component={Calculator} />
    <App.Screen name="ConfigParams" component={ConfigParams} />
  </App.Navigator>
)

export default AppRoutes;
