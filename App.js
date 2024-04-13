import { StatusBar } from "expo-status-bar";
import { UserProvider } from "./src/contexts/userContext";
import { Router } from "./src/router";

export default function App() {
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <Router />
    </UserProvider>
  );
}
