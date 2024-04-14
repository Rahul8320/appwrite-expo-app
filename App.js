import { StatusBar } from "expo-status-bar";
import { UserProvider } from "./src/contexts/userContext";
import { Router } from "./src/router";
import { IdeasProvider } from "./src/contexts/ideasContext";

export default function App() {
  return (
    <UserProvider>
      <IdeasProvider>
        <StatusBar style="auto" />
        <Router />
      </IdeasProvider>
    </UserProvider>
  );
}
