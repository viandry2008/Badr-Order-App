import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ColorStyle from '../../styles/ColorStyle'

const DetailOrderPage = () => {

    const coumnText = (title1: string,title2: string) => {
                return (
                    <View style={{marginBottom:16}}>
                        <Text style={{fontFamily:'Poppins-Regular',fontSize:16,color: ColorStyle.black,marginBottom:10}}>{title1}</Text>
                        <Text style={{fontFamily:'Poppins-Bold',fontSize:20,color: ColorStyle.primary1}}>{title2}</Text>
                    </View>
                )
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {coumnText('Order ID',11001100+'')}
                {coumnText('Customer Name','Anugrah Store')}
                {coumnText('Total Order Price','Rp 1.000.000')}
                <Text style={{fontFamily:'Poppins-Regular',fontSize:16,color: ColorStyle.gray3,marginTop:8,marginBottom:16}}>
                    Product Detail
                </Text>
                {rowText('Product Name','Hero Mie')}
                {rowText('Price','Rp 1.000')}
                {rowText('Quantity','10')}
                {rowText('Total Price','Rp 10.000')}
                <View
                    style={{
                        borderBottomColor: '#E0E0E0',
                        borderBottomWidth: 0.5,
                        marginTop:8,
                        marginBottom:16
                    }}
                />
                {rowText('Product Name','Hero Mie')}
                {rowText('Price','Rp 1.000')}
                {rowText('Quantity','10')}
                {rowText('Total Price','Rp 10.000')}
            </ScrollView>
        </View>
    )
}

export default DetailOrderPage

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: ColorStyle.white },
})