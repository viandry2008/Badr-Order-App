import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/routes/MainNavigation';

const AppNavigation = () => {

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
