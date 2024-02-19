
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as WebBrowser from "expo-web-browser";

import Login from './src/screens/Login';

WebBrowser.maybeCompleteAuthSession();
const RootStack = createStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};
export default function App():JSX.Element {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#797979',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}>
        <RootStack.Group>
          <RootStack.Screen
            name="login"
            component={Login}
            options={{title: 'Home'}}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
