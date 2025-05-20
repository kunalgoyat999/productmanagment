import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';

export const getProducts = () => axios.get(`${API_BASE}/products`);
export const addProduct = (product) => axios.post(`${API_BASE}/products`, product);
export const updateProduct = (id, product) => axios.put(`${API_BASE}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/products/${id}`);
