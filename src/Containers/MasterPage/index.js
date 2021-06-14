import React from 'react';
import { View } from 'react-native';
import { Gutters, Layout } from '@/Theme';
import { useTranslation } from 'react-i18next';
import { Appbar, Drawer } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { navigateAndSimpleReset } from '@/Navigators/Root';

const MasterPage = (props) => {
  const { contentProps, optionTop } = props;

  const _goBack = () => {
    console.log('press back');
    navigateAndSimpleReset(optionTop.backPage);
  };

  const _handleMore = () => {
    console.log('Shown more');
    props.navigation.dispatch(DrawerActions.openDrawer());
  };

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

        <View style={[Layout.fill, Layout.colCenter]}>{contentProps}</View>
      </>
    );
  }

  return <View style={[Layout.fill, Layout.colHCenter]}>{Content()}</View>;
};

export default MasterPage;
