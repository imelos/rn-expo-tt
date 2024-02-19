import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import GoogleLoginBtn from "../components/google/button";

export default function Login(): JSX.Element {
  return (
    <View style={styles.container}>
      <GoogleLoginBtn />
      <Text>login</Text>
    </View>
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
