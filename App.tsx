import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/routes/MainNavigation';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AppNavigation = () => {

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OrderApp</Text>
      <Text style={styles.subtitle}>Your favorite ordering app</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
});

export default AppNavigation;
