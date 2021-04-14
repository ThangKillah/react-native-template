import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
  IndexInstallationContainer,
  IndexLoginContainer,
  IndexForgotContainer,
  IndexHomeContainer,
  IndexProfileContainer,
} from '@/Containers';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  const isConfiguration = useSelector(
    (state) => state.settings.item.configuration
  );

  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Login" component={IndexLoginContainer} />
      <Stack.Screen name="Forgot" component={IndexForgotContainer} />
      <Stack.Screen name="Homepage" component={IndexHomeContainer} />
      <Stack.Screen name="Profile" component={IndexProfileContainer} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
