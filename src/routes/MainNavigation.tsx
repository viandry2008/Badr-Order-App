import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import OrderPage from '../pages/orderPage';
import NewOrderPage from '../pages/orderPage/NewOrderPage';
import DetailOrderPage from '../pages/orderPage/DetailOrderPage';
import EditOrderPage from '../pages/orderPage/EditOrderPage';

// Komponen HeaderOptions yang mengembalikan objek
const HeaderOptions = (title: string, icon: any, onPress: () => void) => ({
    title,
    headerTitleAlign: 'center' as const,
    headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    headerLeft: () => (
        <TouchableOpacity onPress={onPress} style={{ marginLeft: 15 }}>
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
                options={() => HeaderOptions('Order', require('../assets/icons/add.png'), () => console.log('Tambah ditekan'))}
            />
            <Stack.Screen
                name="NewOrder"
                component={NewOrderPage}
                options={() => HeaderOptions('Add New Order', require('../assets/icons/back.png'), () => console.log('Kembali ke Order'))}
            />
            <Stack.Screen
                name="DetailOrder"
                component={DetailOrderPage}
                options={() => HeaderOptions('Detail Order', require('../assets/icons/back.png'), () => console.log('Kembali ke Order'))}
            />
            <Stack.Screen
                name="EditOrder"
                component={EditOrderPage}
                options={() => HeaderOptions('Edit Order', require('../assets/icons/back.png'), () => console.log('Kembali ke Order'))}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
