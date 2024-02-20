import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { Props } from "./../navigation/Navigation";

const Login: React.FC<Props<"login">> = ({navigation}) => {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
