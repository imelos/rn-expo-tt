import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserInfoScreenProps } from "./UserInfo";

export default function Login({
  navigation,
}: UserInfoScreenProps): JSX.Element {
  return (
    <View style={styles.container}>
      {/* <GoogleLoginBtn /> */}
      <Text>login</Text>
      <Button
        title="sign in with google"
        onPress={() => {
          navigation.replace("userInfo", {email: 'vovik'});
        }}
      />
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
