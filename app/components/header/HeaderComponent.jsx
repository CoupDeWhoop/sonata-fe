import React from "react";
import { Appbar } from "react-native-paper";

export const HeaderComponent = ({ title, backAction, navigation }) => (
  <Appbar style={{ backgroundColor: "#F3E38B" }}>
    <Appbar.BackAction onPress={() => navigation.navigate(backAction)} />
    <Appbar.Content title={title} />
  </Appbar>
);
