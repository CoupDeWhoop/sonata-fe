import { View, TextInput, SafeAreaView, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("testemail@test.com");
  const [password, setPassword] = useState("Password123");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin(email, password); // has onLogin!(email, password)
    if (result && result.error) {
      alert(result.msg);
    }
  };

  //Automatically call the login after a successful registration
  const register = async () => {
    navigation.navigate("Register");
    // const result = await onRegister(email, password);
    // if (result && result.error) {
    //   alert(result.msg);
    // } else {
    //   login();
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.image} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button
          mode="outlined"
          onPress={login}
          buttonColor="#B9D9EB"
          textColor="black"
        >
          Sign in
        </Button>
        <Button
          mode="outlined"
          onPress={register}
          buttonColor="#B9D9EB"
          textColor="black"
        >
          Create Account
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E38B",
  },
});

export default Login;
