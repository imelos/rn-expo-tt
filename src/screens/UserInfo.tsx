import { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../features/auth/AuthContext";

const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{authContext.state.email}</Text>
      <Button
        title="Log out"
        onPress={() => {
          authContext.signOut();
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

export default UserInfo;
