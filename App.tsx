import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as WebBrowser from "expo-web-browser";

import Login from "./src/screens/Login";
import UserInfo from "./src/screens/UserInfo";

WebBrowser.maybeCompleteAuthSession();

export type RootStackParamList = {
  login: undefined;
  userInfo: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const linking = {
  prefixes: ['myurlhere://'],
  config: {

    screens: {
      login: 'login',
      userInfo: 'userInfo',
    },
  },
};
export default function App(): JSX.Element {
  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      <RootStack.Navigator
        screenOptions={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: "#797979",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <RootStack.Group>
          <RootStack.Screen
            name="login"
            component={Login}
            options={{ title: "Login" }}
          />
          <RootStack.Screen
            name="userInfo"
            component={UserInfo}
            options={{ title: "User Info" }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
