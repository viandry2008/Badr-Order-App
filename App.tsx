import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/routes/MainNavigation';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const AppNavigation = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigation;
