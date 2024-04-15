import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Pressable,
  Modal,
} from "react-native";
import { useUser } from "../contexts/userContext";
import { useIdeas } from "../contexts/ideasContext";
import { useState } from "react";
import { toast } from "../utils/toast";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const submitIdeas = () => {
    if (title.trim().length > 0) {
      ideas.add({
        userId: user.current.$id,
        title,
        description,
      });
      setTitle("");
      setDescription("");
      setModalVisible(!modalVisible);
    } else {
      toast("Title can not be empty!");
    }
  };

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          {user.current ? (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.header}>Submit Idea</Text>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={{ marginTop: 7 }}
                  >
                    <AntDesign name="closecircleo" size={18} color="gray" />
                  </Pressable>
                </View>
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
                  <Button title="Submit" onPress={submitIdeas} />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.section}>
              <Text>Please login to submit an idea.</Text>
            </View>
          )}
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Add new idea</Text>
        </Pressable>
      </View>

      {/* latest ideas section */}
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
    width: 300,
    borderRadius: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomeScreen;
