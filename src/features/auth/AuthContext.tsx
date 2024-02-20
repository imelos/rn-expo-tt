import React, { createContext, PropsWithChildren } from "react";
import { getItem, setItem, deleteItem } from "../../storage/storage";

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

export const USER_KEY = "user";
export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    email: null,
  });

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      try {
        user = await getItem(USER_KEY);
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: AuthActionTypes.RESTORE, email: user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email) => {
        await setItem(USER_KEY, email);
        dispatch({ type: AuthActionTypes.SIGN_IN, email });
      },
      signOut: async () => {
        await deleteItem(USER_KEY);
        dispatch({ type: AuthActionTypes.SIGN_OUT });
      },
      state: state,
    }),
    [state]
  );
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
