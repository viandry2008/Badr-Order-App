import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import OrderPage from '../pages/orderPage';
import AntDesign from '@react-native-vector-icons/ant-design';
import { TouchableOpacity } from 'react-native';

// const stack
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Order'}>
            <Stack.Screen
                name="Order"
                component={OrderPage}
                options={{
                    title: 'Order',
                    headerTitleAlign: 'center', // Pusatkan title
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 15 }}
                            onPress={() => console.log('Tambah ditekan')}>
                            <AntDesign name="plus" size={24} color="#00B4FF" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
