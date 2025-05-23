import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateProduct } from '../api/api';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [form, setForm] = useState({
    name: product.name,
    price: product.price.toString(),
    description: product.description,
  });

  const handleSubmit = async () => {
    try {
      await updateProduct(product.id, { ...form, price: parseFloat(form.price) });
      navigation.pop();
    } catch {
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={form.name} onChangeText={(val) => setForm({ ...form, name: val })} style={styles.input} />
      <TextInput value={form.price} keyboardType="numeric" onChangeText={(val) => setForm({ ...form, price: val })} style={styles.input} />
      <TextInput value={form.description} onChangeText={(val) => setForm({ ...form, description: val })} style={styles.input} />
      <Button title="Update Product" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, borderColor: '#ccc' },
});
