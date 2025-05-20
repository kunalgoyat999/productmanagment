import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { addProduct } from '../api/api';

export default function AddProductScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description) return Alert.alert('Error', 'All fields required');
    try {
      await addProduct({ ...form, price: parseFloat(form.price) });
      navigation.pop();
    } catch {
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={form.name} onChangeText={(val) => setForm({ ...form, name: val })} style={styles.input} />
      <TextInput placeholder="Price" keyboardType="numeric" value={form.price} onChangeText={(val) => setForm({ ...form, price: val })} style={styles.input} />
      <TextInput placeholder="Description" value={form.description} onChangeText={(val) => setForm({ ...form, description: val })} style={styles.input} />
      <Button title="Add Product" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, borderColor: '#ccc' },
});
