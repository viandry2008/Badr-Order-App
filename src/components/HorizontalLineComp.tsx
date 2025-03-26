import React from 'react';
import { StyleSheet, View } from 'react-native';

const HorizontalLineComp = () => ({
}) => {
    return (
        <View style={styles.divider} />
    );
};

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.5,
        marginVertical: 16,
    },
});

export default HorizontalLineComp;
