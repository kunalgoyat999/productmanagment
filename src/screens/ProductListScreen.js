import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getProducts, deleteProduct } from '../api/api';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch products');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) fetchProducts();
  }, [isFocused]);

  const confirmDelete = (id) => {
    Alert.alert('Delete Product', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteProduct(id);
            fetchProducts();
          } catch {
            Alert.alert('Error', 'Failed to delete');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Price: ₹{item.price}</Text>
      <Text>{item.description}</Text>
      <View style={styles.row}>
        <Button title="Edit" onPress={() => navigation.navigate('EditProduct', { product: item })} />
        <Button title="Delete" color="red" onPress={() => confirmDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  item: { backgroundColor: '#f0f0f0', marginVertical: 8, padding: 10, borderRadius: 5 },
  title: { fontSize: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
