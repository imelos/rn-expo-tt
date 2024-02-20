import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import * as SecureStore from "expo-secure-store";

import { setItem, getItem } from "../../../storage/storage";
import { AuthContext } from "../AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginBtn(): JSX.Element {
  const authContext = useContext(AuthContext);

  const config = {
    androidClientId:
      "622762714548-m965a490quddb91hmr7qe3q1dn8c7qf1.apps.googleusercontent.com",
    iosClientId:
      "622762714548-a8fe8fn6qtqok6kooccab0fdlaliblef.apps.googleusercontent.com",
    webClientId:
      "622762714548-7vki4k50gss2edvc3l4ppq51bmqb25cb.apps.googleusercontent.com",
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const resp = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await resp.json();
      authContext.signIn(user.email);
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
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } catch (error) {
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };

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
