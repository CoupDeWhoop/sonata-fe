import React, { useState } from "react";
import {  StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Text, TextInput } from "react-native-paper"
import { formatDate, formatTime } from "../utils/format-date";
import { postLesson } from "../../utils/api";




export default AddLesson = ({setVisible}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date().toISOString())
    const [duration, setDuration] = useState('20')
    const [error, setError] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const handleLessonConfirm = async() => {
        const newLesson = {
            timestamp: date,
            duration: Number(duration)
        }

        try {
            await postLesson(newLesson.timestamp, newLesson.duration);
            setVisible(false);
          } catch (error) {
            console.error('Error posting lesson:', error);
            setError('Failed to post the lesson. Please try again later.');
          }
    }


    return (
        <View>
            <Text variant="titleLarge">Lesson Date: {`${formatDate(date, 'long')}`}</Text>
            <Text variant="titleLarge">Lesson Time: {`${formatTime(date)}`}</Text>
            <TextInput keyboardType="numeric"
                onChangeText = {(num) => setDuration(num)}
                value = {duration}
            />
            <Button style={styles.button} mode='elevated' onPress={showDatePicker} >
                Choose lesson time & date
            </Button>
            <Button style={styles.button} mode='elevated' onPress={handleLessonConfirm} >
                Confirm
            </Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 16
    }
})