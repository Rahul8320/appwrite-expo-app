import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../contexts/userContext";
import { useState } from "react";
import { toast } from "../utils/toast";

const LoginScreen = ({ navigation }) => {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginHandler = async () => {
    if (email.trim().length > 0 && password.trim().length > 0) {
      await user.login(email, password);
    } else {
      toast("Please enter your credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login To Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={submitLoginHandler} />
      </View>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <Text>Don't have an account, </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "blue" }}> Register now. </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LoginScreen;
