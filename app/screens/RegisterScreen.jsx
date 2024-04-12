import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, HelperText } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContext";

import { Button, TextInput } from "react-native-paper";
import { HeaderComponent } from "../components/header/HeaderComponent";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const RegisterScreen = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onLogin, onRegister } = useAuth();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleInputChange = async (field) => {
    if (errors[field] && !isSubmitting) {
      await trigger(field);
    }
  };

  const onPressSend = async (formData) => {
    // continues with the validated form data
    setIsSubmitting(true);
    const { name, email, password } = formData;
    try {
      const newUser = await onRegister(name, email, password);
      const result = await onLogin(email, password);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.view}>
        <HeaderComponent
          navigation={navigation}
          title="Register"
          backAction="Login"
        />
        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Name"
                error={errors.name ? true : false}
                style={styles.input}
              />
            )}
          />
          {errors.name && (
            <HelperText type="error" visible={true}>
              {errors.name.message}
            </HelperText>
          )}
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  handleInputChange("email");
                }}
                placeholder="Email"
                keyboardType="email-address"
                error={errors.email ? true : false}
                style={styles.input}
              />
            )}
          />
          {errors.email && (
            <HelperText type="error" visible={true}>
              {errors.email.message}
            </HelperText>
          )}
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  handleInputChange("password");
                }}
                placeholder="Password"
                label="Password"
                error={errors.password ? true : false}
                style={styles.input}
                secureTextEntry={true}
                right={<TextInput.Icon name="eye-off-outline" />}
              />
            )}
          />
          {errors.password && (
            <HelperText type="error" visible={true}>
              {errors.password.message}
            </HelperText>
          )}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  handleInputChange("confirmPassword");
                }}
                placeholder="Confirm Password"
                label="Confirm Password"
                error={errors.confirmPassword ? true : false}
                style={styles.input}
                secureTextEntry={true}
                right={<TextInput.Icon name="eye-off-outline" />}
              />
            )}
          />
          {errors.confirmPassword && (
            <HelperText type="error" visible={true}>
              {errors.confirmPassword.message}
            </HelperText>
          )}
          <Button
            mode="outlined"
            buttonColor="#B9D9EB"
            textColor="black"
            onPress={handleSubmit(onPressSend)}
            disabled={isSubmitting}
            loading={isSubmitting}
            style={styles.button}
          >
            Register
          </Button>

          <View style={styles.textSection}>
            <Text variant="bodyLarge" style={{ fontWeight: "800" }}>
              Passwords need to include...
            </Text>
            <Text variant="bodyMedium">
              {"\u2022"} At least one lowercase letter
            </Text>
            <Text variant="bodyMedium">
              {"\u2022"} At least one uppercase letter
            </Text>
            <Text variant="bodyMedium">
              {"\u2022"} At least eight characters
            </Text>
            <Text variant="bodyMedium">
              {"\u2022"} At least one number or symbol
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    margin: 10,
    gap: 10,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FFF",
  },
  textSection: {
    marginTop: 8,
    gap: 4,
    alignSelf: "center",
  },
});
