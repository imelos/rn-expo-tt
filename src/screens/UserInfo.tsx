import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

// export type UserInfoScreenProps = StackNavigationProp<RootStackParamList, "userInfo">;

export interface UserInfoScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "userInfo">;
 }

export default function UserInfo(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>userInfo</Text>
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
