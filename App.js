import * as React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./src/navigations/AuthNavigator";
import Toast from "react-native-toast-message";

const App = () => {

  return (
        <NavigationContainer>
          <StatusBar
            hidden
            backgroundColor="rgb(106,15,30)"
            barStyle="light-content"
          />
          <AuthNavigator />
          <Toast position="bottom"/>
        </NavigationContainer>
  );
};

export default App
