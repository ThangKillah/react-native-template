import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IndexSplashScreenContainer } from '@/Containers';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

let MainNavigator = require('@/Navigators/Main').default;

// @refresh reset
const ApplicationNavigator = () => {
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);

  const applicationIsLoading = useSelector((state) => state.startup.loading);

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      MainNavigator = require('@/Navigators/Main').default;
      setIsApplicationLoaded(true);
    }
  }, [applicationIsLoading]);

  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen
        name="SplashScreen"
        component={IndexSplashScreenContainer}
      />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
