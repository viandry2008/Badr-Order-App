import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import ColorStyle from '../styles/ColorStyle';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'solid' | 'outline';
    color?: string;
    disabled?: boolean;
    style?: ViewStyle;
}

const ButtonComponent = ({ label,
    onPress,
    variant = 'solid',
    color = ColorStyle.primary1,
    disabled = false,
    style }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'outline' ? [styles.outlineButton, { borderColor: color }] : { backgroundColor: color },
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <Text style={[styles.text, variant === 'outline' ? { color: color } : { color: '#fff' }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineButton: {
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    disabled: {
        opacity: 0.5,
    },
});

export default ButtonComponent;
