import { useEffect, useContext } from "react";
import { Button } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import { AuthContext } from "../AuthContext";

const FacebookBtn = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const config = {
    // clientId: "937586767483443",
  };

  const [request, response, promptAsync] = Facebook.useAuthRequest(config);

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const resp = await fetch(`https://graph.facebook.com/me=${token}`);
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

  const signInWithFb = async () => {
    if (response?.type === "success" && response?.authentication) {
      getUserInfo(response.authentication.accessToken);
    }
  };

  useEffect(() => {
    signInWithFb();
  }, [response]);

  return (
    <Button
      title="sign in with facebook"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

export default FacebookBtn;
