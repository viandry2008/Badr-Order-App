import { BlurView } from '@react-native-community/blur';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import HorizontalLineComp from '../../components/HorizontalLineComp';
import { deleteOrder, fetchOrders, resetOrders } from '../../redux/slices/orderSlice';
import { AppDispatch, RootState } from '../../redux/store';
import ColorStyle from '../../styles/ColorStyle';

const OrderPage = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: orders, loading, hasMore, page } = useSelector((state: RootState) => state.orders);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        dispatch(resetOrders());
        dispatch(fetchOrders(1));
    }, [dispatch]);

    const loadMore = () => {
        if (!loading && hasMore) {
            dispatch(fetchOrders(page));
        }
    };

    const handleDelete = () => {
        if (selectedOrder) {
            dispatch(deleteOrder(selectedOrder.id));
            setShowDeleteModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.orderTitle}>Order Id</Text>
                        <Text style={styles.orderId}>{item.id}</Text>
                        <HorizontalLineComp />
                        <View style={styles.rowText}>
                            <Text style={styles.textGray}>Customer</Text>
                            <Text style={styles.textBlue}>{item.customer_name}</Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.textGray}>Total Products</Text>
                            <Text style={styles.textBlue}>{item.total_products}</Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.textGray}>Total Price</Text>
                            <Text style={styles.textBlue}>{item.total_price}</Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.textGray}>Order Date</Text>
                            <Text style={styles.textBlue}> {moment(item.created_at).format('DD/MM/YYYY HH:mm')}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <ButtonComponent label="Edit" onPress={() => navigation.navigate('FormOrder', { orderId: item.id })} style={styles.flexButton} />
                            <ButtonComponent label="Detail" onPress={() => navigation.navigate('DetailOrder', { orderId: item.id })} variant="outline" color={ColorStyle.primary2} style={styles.flexButton} />
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    setSelectedOrder(item);
                                    setShowDeleteModal(true);
                                }}
                            >
                                <Image source={require('../../assets/icons/delete.png')} style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
            />

            {/* Modal Konfirmasi Hapus */}
            <Modal transparent={true} visible={showDeleteModal} animationType="fade">
                <View style={styles.modalOverlay}>
                    <BlurView style={styles.blurBackground} blurType="light" blurAmount={10} />
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Are you sure to delete this?</Text>
                        <Text style={styles.modalDescription}>
                            You can't recover data because it will be deleted permanently.
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonComponent label="Yes, delete it" variant="outline" onPress={handleDelete} color={ColorStyle.error} style={{ marginBottom: 16 }} />
                            <ButtonComponent label="Back" onPress={() => setShowDeleteModal(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default OrderPage;

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, backgroundColor: ColorStyle.white },
    item: { marginVertical: 16, padding: 16, borderRadius: 4, borderWidth: 1, borderColor: '#E0E0E0' },
    orderTitle: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#052A49' },
    orderId: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#052A49' },
    rowText: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    textGray: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#4F4F4F' },
    textBlue: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#052A49' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    flexButton: { flex: 1, marginRight: 8 },
    deleteButton: { width: 44, height: 44, borderRadius: 4, borderWidth: 1, borderColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' },
    deleteIcon: { width: 24, height: 24 },
    modalOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    blurBackground: { ...StyleSheet.absoluteFillObject, overlayColor: 'rgba(5, 42, 73, 0.3)' },
    modalContainer: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 8, alignItems: 'center' },
    modalTitle: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#333', textAlign: 'center' },
    modalDescription: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#666', textAlign: 'center', marginTop: 10, marginBottom: 20 },
    modalButtonContainer: { width: '100%' },
    error: { color: 'red', textAlign: 'center', marginTop: 10 },
});
