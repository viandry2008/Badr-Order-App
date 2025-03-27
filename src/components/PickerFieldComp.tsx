import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorStyle from '../styles/ColorStyle';

// Fungsi untuk memformat angka ke Rupiah
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount).replace(',00', '');
};

type PickerFieldProps = {
  name: string;
  selectedValue: number | undefined;
  onValueChange: (value: number) => void;
  options: { id: number; name: string; price: number }[];
};

const PickerFieldComp = ({ name, selectedValue, onValueChange, options }: PickerFieldProps) => {
  const hasAsterisk = name.includes('*');

  return (
    <View>
      <Text style={styles.label}>
        {name.replace('*', '')}
        {hasAsterisk && <Text style={styles.asterisk}>*</Text>}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue ?? undefined}
          onValueChange={(value: number) => onValueChange(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select an option" value={undefined} />
          {options.map((option) => (
            <Picker.Item key={option.id} label={`${option.name} - ${formatCurrency(option.price)}`} value={option.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  picker: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 10, // Menambah padding agar teks tidak terlalu ke pinggir
  },
});
