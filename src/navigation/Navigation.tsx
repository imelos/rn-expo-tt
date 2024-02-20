import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

import * as WebBrowser from "expo-web-browser";

import Login from "./../screens/Login";
import UserInfo from "./../screens/UserInfo";

import { AuthContext } from "../features/auth/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export type RootStackParamList = {
  login: undefined;
  userInfo: { email: string };
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
  prefixes: ["myurlhere://"],
  config: {
    screens: {
      login: "login",
      userInfo: "userInfo",
    },
  },
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
export type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

export default function Navigation(): JSX.Element {
  const authContext = useContext(AuthContext);
  console.log('context')
  console.log(authContext.state.email)

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
      </RootStack.Navigator>
    </NavigationContainer>
  );
}