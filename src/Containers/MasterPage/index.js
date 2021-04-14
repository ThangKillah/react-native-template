import React, { useState } from 'react';
import { View } from 'react-native';
import { Gutters, Layout } from '@/Theme';
import { useTranslation } from 'react-i18next';
import { Appbar, Drawer } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { navigateAndSimpleReset } from '@/Navigators/Root';

const MasterPage = (
  props,
  ContentProps,
  optionTop = null,
  optionBottom = null
) => {
  const [active, setActive] = useState('');

  const _goBack = () => {
    console.log('press back');
    navigateAndSimpleReset(optionTop.backPage);
  };

  const _handleMore = () => {
    console.log('Shown more');
    props.navigation.dispatch(DrawerActions.openDrawer());
  };

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

  function Content() {
    return (
      <>
        <Appbar.Header>
          {optionTop && optionTop.backPage && (
            <Appbar.BackAction onPress={() => _goBack()} />
          )}
          <Appbar.Content
            title={(optionTop && optionTop.title) || ''}
            subtitle={(optionTop && optionTop.subTitle) || ''}
          />
          <Appbar.Action icon="dots-vertical" onPress={() => _handleMore()} />
        </Appbar.Header>

        <View style={[Layout.fill, Layout.colCenter]}>{ContentProps}</View>
      </>
    );
  }

  const MyDrawer = createDrawerNavigator();

  return (
    <View style={[Layout.fill, Layout.colHCenter]}>
      <>
        <MyDrawer.Navigator
          drawerContent={() => <DrawerContent />}
          drawerPosition="right"
        >
          <MyDrawer.Screen name="Home" component={Content} />
        </MyDrawer.Navigator>
      </>
    </View>
  );
};

export default MasterPage;
