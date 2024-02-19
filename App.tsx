
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
// const apiUrl = process.env.ANDROID_CLIENT_ID;
console.log('hell1s')
// console.log(ANDROID_CLIENT_ID)
WebBrowser.maybeCompleteAuthSession();

export default function App():JSX.Element {

  const [userInfo, setUserInfo] = useState(null);

  //client IDs from .env
  const config = {
    androidClientId: "622762714548-m965a490quddb91hmr7qe3q1dn8c7qf1.apps.googleusercontent.com",
    // iosClientId: "739821462721-d4nf5tnd2k9p4asa93h5gf6b1idhr2b0.apps.googleusercontent.com",
    // webClientId: "739821462721-vqrj25f83munq4nnftef85utqfkh8asd.apps.googleusercontent.com",
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  console.log('response')
  console.log(response)
  // console.log(request)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app2!21</Text>
      <Button title= "sign in with google" onPress={()=>{promptAsync()}}/>
      <StatusBar style="auto" />
    </View>
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
