import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ColorStyle from '../../styles/ColorStyle';

const DetailOrderPage = () => {
    const productList = [
        { id: '1', name: 'Hero Mie', price: 'Rp 1.000', quantity: '10', totalPrice: 'Rp 10.000' },
        { id: '2', name: 'Super Snack', price: 'Rp 2.000', quantity: '5', totalPrice: 'Rp 10.000' },
        { id: '3', name: 'Super Snack', price: 'Rp 2.000', quantity: '5', totalPrice: 'Rp 10.000' },
        { id: '4', name: 'Super Snack', price: 'Rp 2.000', quantity: '5', totalPrice: 'Rp 10.000' },
        { id: '5', name: 'Super Snack', price: 'Rp 2.000', quantity: '5', totalPrice: 'Rp 10.000' },
    ];

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
            {rowText('Product Name', item.name)}
            {rowText('Price', item.price)}
            {rowText('Quantity', item.quantity)}
            {rowText('Total Price', item.totalPrice)}
            <View style={styles.divider} />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {columnText('Order ID', '11001100')}
                {columnText('Customer Name', 'Anugrah Store')}
                {columnText('Total Order Price', 'Rp 1.000.000')}
                <Text style={styles.sectionTitle}>Product Detail</Text>
                <FlatList
                    data={productList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false} // Agar FlatList mengikuti ScrollView
                />
            </ScrollView>
        </View>
    );
};

export default DetailOrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: ColorStyle.white },
    textRegular: { fontFamily: 'Poppins-Regular', fontSize: 16, color: ColorStyle.black, marginBottom: 10 },
    textBold: { fontFamily: 'Poppins-Bold', fontSize: 20, color: ColorStyle.primary1 },
    rowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    textSmall: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#4F4F4F' },
    sectionTitle: { fontFamily: 'Poppins-Regular', fontSize: 16, color: ColorStyle.gray3, marginTop: 8, marginBottom: 16 },
    divider: { borderBottomColor: '#E0E0E0', borderBottomWidth: 0.5, marginTop: 8, marginBottom: 16 },
});
