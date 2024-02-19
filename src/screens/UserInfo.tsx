import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { Props } from "../../App";

export interface UserInfoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "userInfo">;
}

const UserInfo: React.FC<Props<"userInfo">> = ({ route, navigation }) => {
  const { email } = route.params;
  return (
    <View style={styles.container}>
      <Text>{email}</Text>
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
