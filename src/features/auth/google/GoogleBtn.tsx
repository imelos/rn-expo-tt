import { useEffect, useContext } from "react";
import { Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { AuthContext } from "../AuthContext";

const GoogleLoginBtn = (): JSX.Element => {
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
};

export default GoogleLoginBtn;
