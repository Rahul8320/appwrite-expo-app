import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/userContext";

const HomeScreen = () => {
  const user = useUser();
  console.log(user.current);

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.current ? user.current.name : "Please login"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
