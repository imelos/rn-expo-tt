import { StyleSheet, Text, View } from "react-native";
import { Props } from "./../navigation/Navigation";
import GoogleLoginBtn from "../features/auth/google/GoogleBtn";

const Login: React.FC<Props<"login">> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <GoogleLoginBtn />
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
