import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ColorStyle from '../styles/ColorStyle';

type InputFieldProps = {
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric';
    editable?: boolean;
};

const InputFieldComp = ({ label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    editable = true }: InputFieldProps) => {

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
            <TextInput
                style={[styles.input, !editable && styles.disabledInput]}
                value={value}
                onChangeText={editable ? onChangeText : undefined}
                placeholder={placeholder}
                keyboardType={keyboardType}
                editable={editable}
            />
        </View>
    );
};

export default InputFieldComp;

const styles = StyleSheet.create({
    label: {
        marginTop: 16,
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: ColorStyle.primary1,
        marginBottom: 5
    },
    asterisk: {
        color: 'red',
        fontSize: 13,
    },
    input: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        height: 50,
        borderWidth: 1,
        borderColor: ColorStyle.gray5,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingBottom: 5,
        backgroundColor: '#fff'
    },
    disabledInput: {
        backgroundColor: '#f2f2f2',
        color: '#888'
    },
});
