import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import ColorStyle from '../../styles/ColorStyle';
import { BlurView } from '@react-native-community/blur';
import HorizontalLineComp from '../../components/HorizontalLineComp';

const OrderPage = ({ navigation }: any) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const fetchOrders = async (currentPage: number) => {
        if (loading || !hasMore) return;

        setLoading(true);
        setTimeout(() => {
            const totalItems = 120;
            const perPage = 10;
            const newOrders = Array.from({ length: perPage }, (_, i) => {
                const id = (currentPage - 1) * perPage + i + 1;
                if (id > totalItems) return null;
                return {
                    id: id.toString(),
                    customer_name: `Customer ${id}`,
                    total_products: Math.floor(Math.random() * 100),
                    total_price: Math.floor(Math.random() * 100000),
                    created_at: new Date().toISOString(),
                };
            }).filter(Boolean) as any[];

            setOrders((prev) => {
                const uniqueOrders = new Set([...prev.map((o) => o.id), ...newOrders.map((o) => o.id)]);
                return Array.from(uniqueOrders).map((id) => [...prev, ...newOrders].find((o) => o.id === id));
            });

            setHasMore(newOrders.length === perPage);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchOrders(page);
    }, [page]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const handleDelete = () => {
        setOrders(orders.filter(order => order.id !== selectedOrder?.id));
        setShowDeleteModal(false);
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
                            <Text style={styles.textBlue}>{item.created_at}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <ButtonComponent label="Edit" onPress={() => console.log('Edit')} style={styles.flexButton} />
                            <ButtonComponent label="Detail" onPress={() => navigation.navigate('DetailOrder')} variant="outline" color={ColorStyle.primary2} style={styles.flexButton} />
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
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: ColorStyle.white,
    },
    item: {
        marginVertical: 16,
        padding: 16,
        marginBottom: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    orderTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#052A49',
    },
    orderId: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#052A49',
    },

    rowText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    textGray: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#4F4F4F',
    },
    textBlue: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#052A49',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    flexButton: {
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        width: 44,
        height: 44,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        width: 24,
        height: 24,
    },
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blurBackground: {
        ...StyleSheet.absoluteFillObject, // Menutupi seluruh layar
        // overlayColor: ColorStyle.primary1
        overlayColor: 'rgba(5, 42, 73, 0.3)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    modalDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    modalButtonContainer: {
        width: '100%',
    },
});
