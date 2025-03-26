import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import InputFieldComp from '../../components/InputFieldComp';
import PickerFieldComp from '../../components/PickerFieldComp';
import ColorStyle from '../../styles/ColorStyle';
import HorizontalLineComp from '../../components/HorizontalLineComp';

type Product = {
    id: string;
    name: string;
    price: string;
    quantity: string;
    totalPrice: string;
};

const NewOrderPage = ({ navigation }: any) => {
    const [customerName, setCustomerName] = useState<string>('');
    const [products, setProducts] = useState<{ id: string; name: string; price: string; quantity: string; totalPrice: string }[]>([
        { id: Date.now().toString(), name: '', price: '', quantity: '', totalPrice: '' }
    ]);
    const [totalOrderPrice, setTotalOrderPrice] = useState<string>('Total price');

    const dummyProducts = [
        { label: 'Select product', value: '' },
        { label: 'Hero Mie', value: 'Hero Mie' },
        { label: 'Super Snack', value: 'Super Snack' },
        { label: 'Choco Bar', value: 'Choco Bar' }
    ];

    const addProduct = () => {
        setProducts([...products, { id: Date.now().toString(), name: '', price: '', quantity: '', totalPrice: '' }]);
    };

    const updateProduct = (id: string, field: keyof Product, value: string) => {
        setProducts(products.map(product => (product.id === id ? { ...product, [field]: value } : product)));
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, padding: 16 }}>
                <InputFieldComp label="Customer Name *" value={customerName} onChangeText={setCustomerName} placeholder="Input customer name" />
                <HorizontalLineComp />
                <Text style={styles.sectionTitle}>Product Detail</Text>
                {products.map((item) => (
                    <View key={item.id} style={styles.productItem}>
                        <PickerFieldComp label="Product Name *" selectedValue={item.name} onValueChange={(value) => updateProduct(item.id, 'name', value)} options={dummyProducts} />
                        <InputFieldComp label="Price" value={item.price} editable={false} />
                        <InputFieldComp label="Quantity *" value={item.quantity} onChangeText={(value) => updateProduct(item.id, 'quantity', value)} keyboardType="numeric" placeholder="Enter quantity" />
                        <HorizontalLineComp />
                    </View>
                ))}
                <ButtonComponent label="Add More Product" onPress={addProduct} style={{ marginBottom: 16, marginTop: 8, width: 184 }} />
                <HorizontalLineComp />
                <InputFieldComp label="Total Order Price" value={totalOrderPrice} editable={false} />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonComponent label="Back" onPress={() => navigation.goBack()} variant="outline" color={ColorStyle.primary1} style={{ flex: 1, marginRight: 8, borderColor: ColorStyle.container }} />
                <ButtonComponent label="Save" onPress={() => console.log('Edit')} color={ColorStyle.primary2} style={{ flex: 1, marginRight: 8 }} />
            </View>
        </View>
    );
};

export default NewOrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: ColorStyle.white },

    sectionTitle: { fontFamily: 'Poppins-Medium', fontSize: 14, color: ColorStyle.gray3, marginBottom: 16 },
    addButton: { backgroundColor: ColorStyle.primary1, padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
    productItem: { paddingBottom: 10 },
    buttonContainer: { backgroundColor: ColorStyle.white, padding: 16, position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', elevation: 2 },
});
