import React, { useState, useEffect, useMemo } from 'react';
import { Text, Button } from 'react-native-paper';

import { Fonts, Gutters, Layout } from '@/Theme';
import { useTranslation } from 'react-i18next';
import MasterPage from '@/Containers/MasterPage';

const Home = (props) => {
  const { t } = useTranslation();
  const back = () => {
    props.navigation.navigate('Login');
  };

  const content = (
    <>
      <Text style={[Fonts.titleLarge]}>Home</Text>
      <Button
        style={[Gutters.largeHMargin]}
        raised
        mode="contained"
        onPress={back}
      >
        {t('back')}
      </Button>
    </>
  );

  return MasterPage(props, content, {
    title: 'Home',
    subTitle: '',
    backPage: 'Login',
  });
};

export default Home;
