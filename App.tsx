import { AuthContextProvider } from "./src/features/auth/AuthContext";
import Navigation from "./src/navigation/Navigation";

export default function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <Navigation/>
    </AuthContextProvider>
  );
}
