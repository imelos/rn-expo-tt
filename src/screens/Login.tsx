import { StyleSheet, Text, View } from "react-native";
import { Props } from "./../navigation/Navigation";
import GoogleLoginBtn from "../features/auth/google/GoogleBtn";
import FacebookLoginBtn from "../features/auth/fb/FacebookBtn";

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Login: React.FC<Props<"login">> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <GoogleLoginBtn />
      {/* <FacebookLoginBtn /> */}
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
