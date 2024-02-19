import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import * as SecureStore from "expo-secure-store";

import { setItem, getItem } from "../../storage/storage";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginBtn(): JSX.Element {
  const [userInfo, setUserInfo] = useState(null);

  //client IDs from .env
  const config = {
    androidClientId:
      "622762714548-m965a490quddb91hmr7qe3q1dn8c7qf1.apps.googleusercontent.com",
    iosClientId:
      "622762714548-a8fe8fn6qtqok6kooccab0fdlaliblef.apps.googleusercontent.com",
    webClientId:
      "622762714548-7vki4k50gss2edvc3l4ppq51bmqb25cb.apps.googleusercontent.com",
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  console.log("response");
  console.log(response);
  // console.log(request)

  const getUserInfo = async (token) => {
    //absent token
    console.log("GET USER INFO");
    if (!token) return;
    //present token
    try {
      const resp = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await resp.json();
      console.log(user);
      //store user information  in Asyncstorage
      await setItem("user", JSON.stringify(user));

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
      const userJSON = await getItem("user");
      console.log("IM HERE1111");
      console.log(userJSON);
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
    <Button
      title="sign in with google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
