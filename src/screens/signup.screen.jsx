import { StyleSheet, TextInput, Text, Button, View } from "react-native";
import { useUser } from "../contexts/userContext";
import { useState } from "react";

export const SignUpScreen = ({ navigation }) => {
  const user = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register New Account</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={(e) => setName(e)}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder="Enter your password"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={async () => {
            await user.register(name, email, password);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SignUpScreen;
