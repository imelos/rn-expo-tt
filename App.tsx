import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

import * as WebBrowser from "expo-web-browser";

import Login from "./src/screens/Login";
import UserInfo from "./src/screens/UserInfo";

import { AuthContextProvider } from "./src/features/auth/AuthContext";
import Navigation from "./src/navigation/Navigation";

export default function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <Navigation/>
    </AuthContextProvider>
  );
}
