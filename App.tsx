
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

export default function App():JSX.Element {

  const [userInfo, setUserInfo] = useState(null);

  //client IDs from .env
  const config = {
    androidClientId: "622762714548-m965a490quddb91hmr7qe3q1dn8c7qf1.apps.googleusercontent.com",
    // iosClientId: "739821462721-d4nf5tnd2k9p4asa93h5gf6b1idhr2b0.apps.googleusercontent.com",
    webClientId: "622762714548-6ql0mptcrvrng2ug55mk4rv42t4bp6as.apps.googleusercontent.com",
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  console.log('response')
  console.log(response)
  // console.log(request)

  const getUserInfo = async (token) => {
    //absent token
    console.log("GET USER INFO")
    if (!token) return;
    //present token
    try {
      const resp = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await resp.json();
      console.log(user)
      //store user information  in Asyncstorage
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      
      setUserInfo(user);
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        error.status,
        error.statusText
      );
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Attempt to retrieve user information from AsyncStorage
      const userJSON = await SecureStore.getItemAsync("user");
      console.log("IM HERE1111")
      console.log(userJSON)
      if (userJSON) {
        // If user information is found in AsyncStorage, parse it and set it in the state
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        // If no user information is found and the response type is "success" (assuming response is defined),
        // call getUserInfo with the access token from the response
        getUserInfo(response.authentication.accessToken);
      }
    } catch (error) {
      // Handle any errors that occur during AsyncStorage retrieval or other operations
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };
  
  //add it to a useEffect with response as a dependency 
  useEffect(() => {
    signInWithGoogle();
  }, [response]);

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
