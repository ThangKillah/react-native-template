import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Button } from 'react-native-paper';

import { Fonts, Gutters, Layout } from '@/Theme';
import Settings from '@/Store/Settings/Init';
import { useTranslation } from 'react-i18next';
import MasterPage from '@/Containers/MasterPage';

const Profile = (props) => {
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
  const content = (
    <>
      <Text style={[Fonts.titleLarge]}>Profile</Text>
      <Button
        style={[Gutters.largeHMargin]}
        raised
        mode="contained"
        onPress={changeTheme}
      >
        {t('actions.change')}
      </Button>
    </>
  );

  return MasterPage(props, content, {
    title: 'Profile',
    backPage: 'Login',
  });
};

export default Profile;
