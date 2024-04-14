import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
} from "react-native";
import { useUser } from "../contexts/userContext";
import { useIdeas } from "../contexts/ideasContext";
import { useState } from "react";

const HomeScreen = () => {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ScrollView>
      {user.current ? (
        <View style={styles.section}>
          <Text style={styles.header}>Submit Idea</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Button
              title="Submit"
              onPress={() => {
                ideas.add({ userId: user.current.$id, title, description });
                setTitle("");
                setDescription("");
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <Text>Please login to submit an idea.</Text>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.header}>Latest Ideas</Text>
        <View>
          {ideas.current.map((idea) => (
            <View key={idea.$id} style={styles.card}>
              <Text style={styles.cardTitle}>{idea.title}</Text>
              <Text style={styles.cardDescription}>{idea.description}</Text>
              {/* Show the remove button to idea owner. */}
              {user.current && user.current.$id === idea.userId && (
                <Button title="Remove" onPress={() => ideas.remove(idea.$id)} />
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    padding: 16,
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
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default HomeScreen;
