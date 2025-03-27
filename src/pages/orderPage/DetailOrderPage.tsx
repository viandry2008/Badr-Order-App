import { FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetail } from '../../redux/slices/orderSlice';
import { RootState, AppDispatch } from '../../redux/store';
import ColorStyle from '../../styles/ColorStyle';

const DetailOrderPage = ({ route }: any) => {
    const { orderId } = route.params; // Ambil orderId dari parameter navigasi
    const dispatch = useDispatch<AppDispatch>();
    const { orderDetail, loading } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(fetchOrderDetail(orderId));
    }, [dispatch, orderId]);

    const columnText = (title1: string, title2: string) => (
        <View style={{ marginBottom: 16 }}>
            <Text style={styles.textRegular}>{title1}</Text>
            <Text style={styles.textBold}>{title2}</Text>
        </View>
    );

    const rowText = (title1: string, title2: string) => (
        <View style={styles.rowContainer}>
            <Text style={styles.textSmall}>{title1}</Text>
            <Text style={[styles.textSmall, { color: '#052A49' }]}>{title2}</Text>
        </View>
    );

    const renderItem = ({ item }: any) => (
        <View>
            {rowText('Product Name', item.product.name)}
            {rowText('Price', `Rp ${item.product.price.toLocaleString()}`)}
            {rowText('Quantity', item.quantity.toString())}
            {rowText('Total Price', `Rp ${(item.quantity * item.product.price).toLocaleString()}`)}
            <View style={styles.divider} />
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={ColorStyle.primary1} />
            </View>
        );
    }

    if (!orderDetail) {
        return (
            <View style={styles.container}>
                <Text style={styles.textRegular}>Order details not available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {columnText('Order ID', orderDetail.order_id)}
                {columnText('Customer Name', orderDetail.customer_name)}
                {columnText(
                    'Total Order Price',
                    `Rp ${orderDetail.products
                        .reduce((total, item) => total + item.quantity * item.product.price, 0)
                        .toLocaleString()}`
                )}
                <Text style={styles.sectionTitle}>Product Detail</Text>
                <FlatList
                    data={orderDetail.products}
                    keyExtractor={(item, index) => `${item.product.id}-${index}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

export default DetailOrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: ColorStyle.white },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    textRegular: { fontFamily: 'Poppins-Regular', fontSize: 16, color: ColorStyle.black, marginBottom: 10 },
    textBold: { fontFamily: 'Poppins-Bold', fontSize: 20, color: ColorStyle.primary1 },
    rowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    textSmall: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#4F4F4F' },
    sectionTitle: { fontFamily: 'Poppins-Regular', fontSize: 16, color: ColorStyle.gray3, marginTop: 8, marginBottom: 16 },
    divider: { borderBottomColor: '#E0E0E0', borderBottomWidth: 0.5, marginTop: 8, marginBottom: 16 },
});
