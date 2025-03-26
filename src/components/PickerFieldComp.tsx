import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorStyle from '../styles/ColorStyle';

type PickerFieldProps = {
    label: string;
    selectedValue: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
};

const PickerFieldComp = ({ label, selectedValue, onValueChange, options }: PickerFieldProps) => {

    const hasAsterisk = label.includes('*');

    return (
        <View>
            <Text style={styles.label}>
                {hasAsterisk ? (
                    <>
                        {label.replace('*', '')}
                        <Text style={styles.asterisk}>*</Text>
                    </>
                ) : (
                    label
                )}
            </Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
                    {options.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }} />
                    ))}
                </Picker>
            </View>
        </View>
    )
};

export default PickerFieldComp;

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: ColorStyle.primary1,
        marginBottom: 5
    },
    asterisk: {
        color: 'red',
        fontSize: 13,
    },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, backgroundColor: '#fff' },
});
