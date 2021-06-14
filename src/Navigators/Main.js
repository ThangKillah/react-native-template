import React from 'react';
import { useSelector } from 'react-redux';
import {
  IndexLoginContainer,
  IndexForgotContainer,
  IndexHomeContainer,
  IndexProfileContainer,
} from '@/Containers';
import { Drawer } from 'react-native-paper';
import { View } from 'react-native';
import { Gutters } from '@/Theme';
import { navigateAndSimpleReset } from '@/Navigators/Root';
import { createDrawerNavigator } from '@react-navigation/drawer';

// @refresh reset
const MainNavigator = () => {
  const [active, setActive] = React.useState('');

  const isConfiguration = useSelector(
    (state) => state.settings.item.configuration
  );

  function DrawerContent() {
    return (
      <Drawer.Section>
        <Drawer.Item label="Summary" active={false} />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
        />
        <Drawer.Item
          icon="desktop-mac-dashboard"
          style={[Gutters.regularLMargin]}
          label="Dashboard"
          active={false}
          onPress={() => {
            setActive('first');
            navigateAndSimpleReset('Homepage');
          }}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
        />
        <Drawer.Item
          icon="google-street-view"
          style={[Gutters.regularLMargin]}
          label="Profile"
          active={active === 'two'}
          onPress={() => {
            setActive('two');
            navigateAndSimpleReset('Profile');
          }}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
        />
        <Drawer.Item label="Other" active={false} />
      </Drawer.Section>
    );
  }

  const Stack = createDrawerNavigator();

  return (
    <Stack.Navigator
      headerMode={'none'}
      drawerPosition="right"
      drawerContent={() => <DrawerContent />}
    >
      <Stack.Screen name="Homepage" component={IndexHomeContainer} />
      <Stack.Screen name="Login" component={IndexLoginContainer} />
      <Stack.Screen name="Forgot" component={IndexForgotContainer} />
      <Stack.Screen name="Profile" component={IndexProfileContainer} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
