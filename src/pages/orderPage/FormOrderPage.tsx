import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/productSlice';
import { createOrder, fetchOrderDetail, updateOrder } from '../../redux/slices/orderSlice';
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

const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount).replace(',00', '');

const parseCurrency = (value: string): number => Number(value.replace(/[^0-9]/g, '')) || 0;

const FormOrderPage = ({ navigation, route }: any) => {
    const { orderId } = route.params || {};
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading: productsLoading } = useSelector((state: RootState) => state.products);
    const { orderDetail, loading: orderLoading } = useSelector((state: RootState) => state.orders);

    const [customerName, setCustomerName] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [totalOrderPrice, setTotalOrderPrice] = useState('Rp0');

    useEffect(() => {
        navigation.setOptions({ title: orderId ? 'Edit Order' : 'Add New Order' });
    }, [orderId]);

    useEffect(() => {
        dispatch(fetchProducts());
        if (orderId) dispatch(fetchOrderDetail(orderId));
    }, [dispatch, orderId]);

    useEffect(() => {
        if (orderDetail && orderId) {
            setCustomerName(orderDetail.customer_name);
            setSelectedProducts(
                orderDetail.products.map((item) => ({
                    id: item.product.id.toString(),
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    totalPrice: item.product.price * item.quantity,
                }))
            );
        }
    }, [orderDetail, orderId]);

    useEffect(() => {
        setTotalOrderPrice(formatCurrency(selectedProducts.reduce((sum, item) => sum + item.totalPrice, 0)));
    }, [selectedProducts]);

    const addProduct = () => {
        setSelectedProducts([...selectedProducts, { id: `${Date.now()}-${Math.random()}`, name: '', price: 0, quantity: 0, totalPrice: 0 }]);
    };

    const updateProduct = useCallback(
        (id: string, field: keyof Product, value: string | number) => {
            setSelectedProducts((prevProducts) =>
                prevProducts.map((product) => {
                    if (product.id !== id) return product;

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
                })
            );
        },
        [products]
    );

    const validateForm = () => {
        if (!customerName.trim()) return 'Customer name is required!';
        if (!selectedProducts.length || selectedProducts.every((p) => !p.name || p.quantity <= 0)) {
            return 'Please select at least one product with a valid quantity!';
        }
        return null;
    };
    
    const saveOrder = async () => {
        const formattedProducts = selectedProducts
            .filter((p) => p.name && p.quantity > 0)
            .map((p) => ({
                product_id: Number(products.find((prod) => prod.name === p.name)?.id),
                quantity: p.quantity,
            }));
    
        const orderData = { customer_name: customerName, products: formattedProducts };
    
        if (orderId) {
            await dispatch(updateOrder({ orderId, orderData }) as any).unwrap();
        } else {
            await dispatch(createOrder(orderData) as any).unwrap();
        }
    };
    
    const handleSaveOrder = async () => {
        const errorMessage = validateForm();
        if (errorMessage) {
            Alert.alert('Error', errorMessage);
            return;
        }
    
        try {
            await saveOrder();
            Alert.alert('Success', `Order ${orderId ? 'updated' : 'created'} successfully!`, [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch {
            Alert.alert('Error', 'Failed to save order');
        }
    };
    
    

    return (
        <View style={styles.container}>
            {orderLoading && orderId ? (
                <ActivityIndicator size="large" color={ColorStyle.primary1} style={{ marginTop: 20 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, padding: 16 }}>
                    <InputFieldComp label="Customer Name *" value={customerName} onChangeText={setCustomerName} placeholder="Input customer name" />
                    <HorizontalLineComp />

                    <Text style={styles.sectionTitle}>Product Detail</Text>

                    {selectedProducts.map((item,index) => (
                        <View key={`${item.id}-${index}`} style={styles.productItem}>
                            <PickerFieldComp
                                name="Product Name *"
                                selectedValue={products.find((p) => p.name === item.name)?.id || 0}
                                onValueChange={(value) => updateProduct(item.id, 'name', value)}
                                options={products}
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

                    {!orderId && (
                        <>
                            <ButtonComponent label="Add More Product" onPress={addProduct} style={{ marginBottom: 16, marginTop: 8, width: 184 }} />
                            <HorizontalLineComp />
                        </>
                    )}

                    <InputFieldComp label="Total Order Price" value={totalOrderPrice} editable={false} />
                </ScrollView>
            )}

            <View style={styles.buttonContainer}>
                <ButtonComponent label="Back" onPress={() => navigation.goBack()} variant="outline" color={ColorStyle.primary1} style={{ flex: 1, marginRight: 8 }} />
                <ButtonComponent label={orderLoading ? 'Saving...' : 'Save'} onPress={handleSaveOrder} color={ColorStyle.primary2} disabled={orderLoading} style={{ flex: 1 }} />
            </View>
        </View>
    );
};

export default FormOrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: ColorStyle.white },
    sectionTitle: { fontSize: 14, color: ColorStyle.gray3, marginBottom: 16 },
    productItem: { paddingBottom: 10 },
    buttonContainer: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', elevation: 2 },
});
