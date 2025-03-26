import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import OrderPage from '../pages/orderPage';
import DetailOrderPage from '../pages/orderPage/DetailOrderPage';
import EditOrderPage from '../pages/orderPage/EditOrderPage';
import NewOrderPage from '../pages/orderPage/NewOrderPage';

const HeaderOptions = (title: string, icon: any, onPress: () => void) => ({
    title,
    headerTitleAlign: 'center' as const,
    headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    headerLeft: () => (
        <TouchableOpacity onPress={onPress}>
            <Image source={icon} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
        </TouchableOpacity>
    ),
});

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Order">
            <Stack.Screen
                name="Order"
                component={OrderPage}
                options={({ navigation }) => HeaderOptions('Order', require('../assets/icons/add.png'), () => navigation.navigate('NewOrder'))}
            />
            <Stack.Screen
                name="NewOrder"
                component={NewOrderPage}
                options={({ navigation }) => HeaderOptions('Add New Order', require('../assets/icons/back.png'), () => navigation.goBack())}
            />
            <Stack.Screen
                name="DetailOrder"
                component={DetailOrderPage}
                options={({ navigation }) => HeaderOptions('Detail Order', require('../assets/icons/back.png'), () => navigation.goBack())}
            />
            <Stack.Screen
                name="EditOrder"
                component={EditOrderPage}
                options={({ navigation }) => HeaderOptions('Edit Order', require('../assets/icons/back.png'), () => navigation.goBack())}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
