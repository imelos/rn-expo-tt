import React, { createContext, PropsWithChildren } from "react";
import { getItem } from "../../storage/storage";

enum AuthActionTypes {
  RESTORE = "RESTORE_EMAIL",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

type AuthAction =
  | { type: AuthActionTypes.RESTORE; email: string }
  | { type: AuthActionTypes.SIGN_IN; email: string }
  | { type: AuthActionTypes.SIGN_OUT };

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  email: string | null;
};

function authReducer(prevState: AuthState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.RESTORE:
      return {
        ...prevState,
        email: action.email,
        isLoading: false,
      };
    case AuthActionTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        email: action.email,
      };
    case AuthActionTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        email: null,
      };
  }
}

export const AuthContext = createContext<{
  signIn: (email: string) => void;
  signOut: () => void;
  state: AuthState;
}>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    email: null,
  });

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;
      try {
        user = await getItem("user");
        console.log("user token");
        console.log("user token");
        console.log("user token");
        console.log(user);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      console.log(user.email);
      console.log(user.email);
      dispatch({ type: AuthActionTypes.RESTORE, email: user });
      console.log(state);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: AuthActionTypes.SIGN_IN, email: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: AuthActionTypes.SIGN_OUT }),
      state: state,
    }),
    [state]
  );
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
