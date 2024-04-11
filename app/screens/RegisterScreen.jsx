import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, TextInput } from "react-native-paper";
import { HeaderComponent } from "../components/header/HeaderComponent";

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderComponent
          navigation={navigation}
          title="Register"
          backAction="Login"
        />
        <View style={styles.content}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput label="Instrument (optional)" style={styles.input} />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
          />
          <TextInput
            label="Confirm password"
            style={styles.input}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
          />
          <Button
            mode="outlined"
            buttonColor="#B9D9EB"
            textColor="black"
            style={styles.button}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F3E38B",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#F3E38B",
    borderWidth: 6,
    borderColor: "blue",
  },
  form: {
    width: "80%",
    gap: 10,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FFF",
  },
  button: {
    marginVertical: 15,
  },
});
