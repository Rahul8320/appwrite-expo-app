import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUser } from "./contexts/userContext";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/login.screen";
import HomeScreen from "./screens/home.screen";
import SignUpScreen from "./screens/signup.screen";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export function Router() {
  const user = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.current == null ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
            }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Home",
              headerRight: () => (
                <TouchableOpacity onPress={() => user.logout()}>
                  <AntDesign name="logout" size={18} color="gray" />
                </TouchableOpacity>
              ),
            }}
          />
        )}
        <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{ title: "Register" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
