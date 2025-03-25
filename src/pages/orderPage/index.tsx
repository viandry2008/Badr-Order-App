    import React, { useState, useEffect } from 'react';
    import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
    import ButtonComponent from '../../components/ButtonComponent';
    import ColorStyle from '../../styles/ColorStyle';

    const OrderPage = ({navigation}:any) => {
        const [orders, setOrders] = useState<any[]>([]);
        const [page, setPage] = useState(1);
        const [loading, setLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true);

        // Dummy API function
        const fetchOrders = async (currentPage: number) => {
            if (loading || !hasMore) return;
            
            setLoading(true);
            setTimeout(() => {
                const totalItems = 120;
                const perPage = 10;
                const newOrders = Array.from({ length: perPage }, (_, i) => {
                    const id = (currentPage - 1) * perPage + i + 1;
                    if (id > totalItems) return null; // Stop fetching if exceeding total
                    return {
                        id: id.toString(), // ID tetap string
                        customer_name: `Customer ${id}`,
                        total_products: Math.floor(Math.random() * 100),
                        total_price: Math.floor(Math.random() * 100000),
                        created_at: new Date().toISOString(),
                    };
                }).filter(Boolean) as any[];
        
                // **Mencegah Duplikasi** dengan Set
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

        const rowText = (title1: string,title2: string) => {
            return (
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}>
                    <Text style={{fontFamily:'Poppins-Regular',fontSize:13,color:'#4F4F4F'}}>{title1}</Text>
                    <Text style={{fontFamily:'Poppins-Regular',fontSize:13,color:'#052A49'}}>{title2}</Text>
                </View>
            )
        };

        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#052A49'}}>Order Id</Text>
                            <Text style={{fontFamily:'Poppins-Bold',fontSize:14,color:'#052A49'}}>{item.id}</Text>
                            <View
                                style={{
                                    borderBottomColor: '#E0E0E0',
                                    borderBottomWidth: 0.5,
                                    marginVertical:16
                                }}
                            />
                            {rowText('Customer',item.customer_name)}
                            {rowText('Total Products',item.total_products)}
                            {rowText('Total Price',item.total_price)}
                            {rowText('Order Date',item.created_at)}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                                <ButtonComponent label="Edit" onPress={() => console.log('Edit')} style={{ flex: 1, marginRight: 8 }} />
                                <ButtonComponent label="Detail" onPress={() => navigation.navigate('DetailOrder')} variant="outline" color={ColorStyle.primary2} style={{ flex: 1, marginRight: 8 }} />
                                <TouchableOpacity
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: '#E0E0E0',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => console.log('Delete')}
                                >
                                    <Image source={require('../../assets/icons/delete.png')} style={{ width: 24, height: 24 }} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                    // ListFooterComponent={loading ? <ActivityIndicator size="large" color="#00B4FF" /> : null}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            </View>
        );
    };

    export default OrderPage;

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, backgroundColor: '#fff' },
        item: { padding: 16, marginBottom: 16, borderRadius: 4, borderWidth:1, borderColor:'#E0E0E0' },
        name: { fontSize: 16, fontWeight: 'bold' },
    });
