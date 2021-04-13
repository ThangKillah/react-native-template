import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Button, Appbar, Drawer } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import {
  Fonts,
  Gutters,
  Layout,
  Colors,
  ColorsDarkMode,
  Svgs
} from '@/Theme';
import Settings from '@/Store/Settings/Init';
import { useTranslation } from 'react-i18next';

import { useSafeArea } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';

const Home = (props) => {
  const { t } = useTranslation();
  const back = () => {
    props.navigation.navigate('Login');
  }
  const [active, setActive] = useState('');

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => {
      console.log('Shown more');
      props.navigation.dispatch(DrawerActions.openDrawer());
  }

    function DrawerContent() {
        return (
            <Drawer.Section>
                <Drawer.Item
                    label="First Item"
                    active={active === 'first'}
                    onPress={() => setActive('first')}
                />
                <Drawer.Item
                    label="Second Item"
                    active={active === 'second'}
                    onPress={() => setActive('second')}
                />
            </Drawer.Section>
        );
    }

    function Content() {
        return (
            <>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => _goBack()} />
                    <Appbar.Content title="Title" subtitle="Subtitle" />
                    <Appbar.Action icon="magnify" onPress={() => _handleSearch()} />
                    <Appbar.Action icon="dots-vertical" onPress={() => _handleMore()} />
                </Appbar.Header>


                <View style={[Layout.fill, Layout.colCenter]}>
                    <Text style={[Fonts.titleLarge]}>Home</Text>
                    <Button style={[Gutters.largeHMargin]} raised mode="contained" onPress={back}>{t('back')}</Button>
                </View>
            </>
        )
    }


    const MyDrawer = createDrawerNavigator();

  return (
     <>
         <MyDrawer.Navigator drawerContent={() => <DrawerContent />} drawerPosition="right">
             <MyDrawer.Screen name="Home" component={Content} />
         </MyDrawer.Navigator>
     </>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const changeTheme = () => {
    dispatch(
      Settings.action({
        colorScheme: settings.item.colorScheme === 'dark' ? 'ligth' : 'dark',
      })
    );
  };
  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text style={[Fonts.titleLarge]}>Profile</Text>
      <Button style={[Gutters.largeHMargin]} raised mode="contained" onPress={changeTheme}>{t('actions.change')}</Button>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const IndexHomeContainer = (props) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const settings = useSelector((state) => state.settings);
  const backgroundColor =
    settings.item.colorScheme === 'dark'
      ? ColorsDarkMode.backgroundPrimary
      : Colors.backgroundPrimary;

  const inactiveColor =
    settings.item.colorScheme !== 'dark'
      ? ColorsDarkMode.backgroundPrimary
      : Colors.backgroundPrimary;

  const tabs = {
    Home: {
      labelStyle: {
        color: '#ffffff',
      },
      icon: {
        component: Svgs.Home,
        activeColor: '#ffffff',
        inactiveColor,
      },
      background: {
        activeColor: '#2196f3',
        inactiveColor: 'rgba(223,215,243,0)',
      },
    },
    Profile: {
      labelStyle: {
        color: '#ffffff',
      },
      icon: {
        component: Svgs.Profile,
        activeColor: '#ffffff',
        inactiveColor,
      },
      background: {
        activeColor: '#ff9800',
        inactiveColor: 'rgba(207,235,239,0)',
      },
    },
  };

  // hooks
  const { bottom } = useSafeArea();

  // memos
  const screenPaddingBottom = useMemo(() => {
    // icon size + margin padding + outer space + inner space + screen bottom padding
    return 20 + bottom + 12 * 2 + 12 * 2 + 12;
  }, [bottom]);

  const tabBarOptions = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        marginBottom: bottom,
        backgroundColor,
        shadowColor: '#000',
         shadowOffset: {
           width: 0,
           height: 12,
         },
         shadowOpacity: 0.58,
         shadowRadius: 16.0,

         elevation: 24,
      },
    }),
    [bottom, backgroundColor]
  );

  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default IndexHomeContainer;
