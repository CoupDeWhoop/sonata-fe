import React, { useContext, useState } from "react";
import PracticeScreen from "../screens/PracticeScreen.jsx";
import StatsScreen from "../screens/StatsScreen.jsx";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LessonsStack } from "./LessonsStack.jsx";
import AddPracticeModal from "../modals/AddPracticeModal.jsx";
import { PracticeModalContext } from "../context/PracticeModalContext.jsx";
import { Alert, View } from "react-native";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const { practiceModalIsVisible, setPracticeModalIsVisible, setNewPractice } =
    useContext(PracticeModalContext);

  const handleClose = async (practice_id) => {
    setPracticeModalIsVisible(false);
    setNewPractice({});
    // try {
    //     await deletePractice(practice_id)
    //     setPracticeModalIsVisible(false)
    // } catch (error) {
    // console.error('An Error occured while cancelling the practice:', error);
    // Alert.alert(
    //     'Error',
    //     'An error occurred while deleting the lesson. Please try again later.',
    //     [
    //         { text: 'OK', onPress: () => console.log('OK Pressed') }
    //     ],
    //     { cancelable: false }
    // );
    // }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {
            backgroundColor: "",
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={LessonsStack}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={PracticeScreen}
          options={{
            tabBarLabel: "Journal",
            tabBarIcon: ({ color }) => (
              <Icon name="book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarLabel: "Stats",
            tabBarIcon: ({ color }) => (
              <Icon name="barchart" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
      <AddPracticeModal
        visible={practiceModalIsVisible}
        onClose={() => handleClose(practice_id)}
      />
    </View>
  );
};
