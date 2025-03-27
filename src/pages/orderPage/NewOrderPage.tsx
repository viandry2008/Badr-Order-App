import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/productSlice';
import ButtonComponent from '../../components/ButtonComponent';
import InputFieldComp from '../../components/InputFieldComp';
import PickerFieldComp from '../../components/PickerFieldComp';
import ColorStyle from '../../styles/ColorStyle';
import HorizontalLineComp from '../../components/HorizontalLineComp';

type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount).replace(',00', '');
};

const parseCurrency = (value: string): number => {
    return Number(value.replace(/[^0-9]/g, '')) || 0;
};

const NewOrderPage = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.products);

    const [customerName, setCustomerName] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([
        { id: Date.now().toString(), name: '', price: 0, quantity: 0, totalPrice: 0 }
    ]);
    const [totalOrderPrice, setTotalOrderPrice] = useState<string>('Rp0');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const total = selectedProducts.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalOrderPrice(formatCurrency(total));
    }, [selectedProducts]);

    const addProduct = () => {
        setSelectedProducts([...selectedProducts, { id: Date.now().toString(), name: '', price: 0, quantity: 0, totalPrice: 0 }]);
    };

    const updateProduct = useCallback((id: string, field: keyof Product, value: string | number) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === id) {
                    const updatedProduct = { ...product, [field]: typeof value === 'string' ? parseCurrency(value) : value };

                    if (field === 'name') {
                        const selectedProduct = products.find((p) => p.id === Number(value));
                        if (selectedProduct) {
                            updatedProduct.price = selectedProduct.price;
                            updatedProduct.name = selectedProduct.name;
                        }
                    }

                    if (field === 'quantity') {
                        updatedProduct.totalPrice = updatedProduct.price * updatedProduct.quantity;
                    }

                    return updatedProduct;
                }
                return product;
            })
        );
    }, [products]);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, padding: 16 }}>
                <InputFieldComp 
                    label="Customer Name *" 
                    value={customerName} 
                    onChangeText={setCustomerName} 
                    placeholder="Input customer name" 
                />
                <HorizontalLineComp />
                
                <Text style={styles.sectionTitle}>Product Detail</Text>

                {selectedProducts.map((item) => (
                    <View key={item.id} style={styles.productItem}>
                        <PickerFieldComp 
                            name="Product Name *" 
                            selectedValue={products.find(p => p.name === item.name)?.id || 0} 
                            onValueChange={(value) => updateProduct(item.id, 'name', value)} 
                            options={products} 
                            // loading={loading}
                        />
                        <InputFieldComp label="Price" value={formatCurrency(item.price)} editable={false} />
                        <InputFieldComp 
                            label="Quantity *" 
                            value={String(item.quantity)} 
                            onChangeText={(value) => updateProduct(item.id, 'quantity', value)} 
                            keyboardType="numeric" 
                            placeholder="Enter quantity" 
                        />
                        <InputFieldComp label="Total Price" value={formatCurrency(item.totalPrice)} editable={false} />
                        <HorizontalLineComp />
                    </View>
                ))}

                <ButtonComponent 
                    label="Add More Product" 
                    onPress={addProduct} 
                    style={{ marginBottom: 16, marginTop: 8, width: 184 }} 
                />
                <HorizontalLineComp />
                
                <InputFieldComp label="Total Order Price" value={totalOrderPrice} editable={false} />
            </ScrollView>

            <View style={styles.buttonContainer}>
                <ButtonComponent 
                    label="Back" 
                    onPress={() => navigation.goBack()} 
                    variant="outline" 
                    color={ColorStyle.primary1} 
                    style={{ flex: 1, marginRight: 8, borderColor: ColorStyle.container }} 
                />
                <ButtonComponent 
                    label="Save" 
                    onPress={() => console.log('Save Order')} 
                    color={ColorStyle.primary2} 
                    style={{ flex: 1, marginRight: 8 }} 
                />
            </View>
        </View>
    );
};

export default NewOrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: ColorStyle.white },
    sectionTitle: { fontFamily: 'Poppins-Medium', fontSize: 14, color: ColorStyle.gray3, marginBottom: 16 },
    productItem: { paddingBottom: 10 },
    buttonContainer: { 
        backgroundColor: ColorStyle.white, 
        padding: 16, 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        elevation: 2 
    },
});
