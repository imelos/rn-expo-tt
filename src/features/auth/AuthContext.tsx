import React, { createContext, PropsWithChildren } from "react";

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
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: AuthActionTypes.SIGN_IN, email: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: AuthActionTypes.SIGN_OUT }),
      state: state,
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
