import { useEffect, useContext } from "react";
import { Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { AuthContext } from "../AuthContext";

const GoogleLoginBtn = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const config = {
    androidClientId: process.env.ANDROID_CLIENT_ID,
    iosClientId: process.env.IOS_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID,
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
    if (response?.type === "success") {
      getUserInfo(response.authentication.accessToken);
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
