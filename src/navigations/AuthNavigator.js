import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AddProductScreen, EditProductScreen, ProductListScreen } from "../screens";
const Stack = createStackNavigator();

function AuthNavigator({}) {

  return (
     <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Edit Product' }} />
      </Stack.Navigator>
  );
}

export default AuthNavigator;
