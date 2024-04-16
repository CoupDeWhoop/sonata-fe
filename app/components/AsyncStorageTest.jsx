import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageTest = () => {
  const [inputText, setInputText] = useState("");
  const [savedText, setSavedText] = useState("");

  const saveText = async () => {
    try {
      await AsyncStorage.setItem("@myText", inputText);
      console.log("saved succesfully", inputText);
    } catch (error) {
      console.error("Error saving text:", error);
      Alert.alert("Error", "Failed to save text. Please try again.");
    }
  };

  const retrieveText = async () => {
    try {
      const text = await AsyncStorage.getItem("@myText");
      if (text !== null) {
        setSavedText(text);
        console.log(text, "retrieved");
      } else {
        Alert.alert("No Text Found", "No text has been saved yet.");
      }
    } catch (error) {
      console.error("Error retrieving text:", error);
      Alert.alert("Error", "Failed to retrieve text. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200 }}
        placeholder="Enter text to save"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Save Text" onPress={saveText} />
      <Button title="Retrieve Text" onPress={retrieveText} />
    </View>
  );
};

export default AsyncStorageTest;
