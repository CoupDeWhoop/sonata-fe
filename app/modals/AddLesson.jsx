import React, { useContext, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Text, TextInput } from "react-native-paper";
import { formatDate, formatTime, postLesson } from "../utils";
import { AppContext } from "../context/AppProvider";
import DateTimePickerWeb from "../components/DateTimePickerWeb";

const AddLesson = ({ setVisible }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState("20");
  const [error, setError] = useState("");
  const { updateLessons } = useContext(AppContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const handleDurationChange = (input) => {
    // Remove non-numeric characters from input
    const numericValue = input.replace(/[^0-9]/g, "");
    setDuration(numericValue);
  };

  const handleLessonConfirm = async () => {
    const newLesson = {
      timestamp: date,
      duration: Number(duration),
    };

    try {
      await postLesson(newLesson.timestamp, newLesson.duration);
      await updateLessons();
      setVisible(false);
    } catch (error) {
      console.error("Error posting lesson:", error);
      setError("Failed to post the lesson. Please try again soon.");
    }
  };

  return (
    <View>
      <Text variant="titleLarge">
        Lesson date: {`${formatDate(date, "long")}`}
      </Text>
      <Text variant="titleLarge">Lesson time: {`${formatTime(date)}`}</Text>
      <Text style={{ marginBottom: 16 }} variant="titleLarge">
        Lesson duration: {`${duration}`}
      </Text>
      {Platform.OS === "web" && (
        <View style={{ zIndex: 100 }}>
          <DateTimePickerWeb date={date} setDate={setDate} />
        </View>
      )}
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={handleDurationChange}
        label="Lesson length (mins)"
        value={duration}
      />
      {Platform.OS !== "web" && (
        <Button style={styles.button} mode="elevated" onPress={showDatePicker}>
          Choose lesson time & date
        </Button>
      )}
      <Button
        style={styles.button}
        mode="elevated"
        onPress={handleLessonConfirm}
      >
        Confirm
      </Button>
      {Platform.OS !== "web" && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
  },
  textInput: {
    marginVertical: 16,
  },
});

export default AddLesson;
