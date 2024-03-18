import { useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"

export default LessonNotesScreen = () => {
    const [newLesson, setNewLesson] = useState({});
    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex:1}}>
                <Text variant="headlineLarge">Add a lesson mofo</Text>
                <TextInput></TextInput>

            </ScrollView>
            <View style={styles.submitButtons}>
                <Button mode="outlined" labelStyle={{fontSize: 12}} onPress={() => onClose()}>
                    Cancel
                </Button>
                <Button mode="contained" contentStyle={{width: 90}}labelStyle={{fontSize: 12}} onPress={() => console.log('Pressed')}>
                    Done
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    submitButtons: {
      flexDirection: 'row',
      paddingVertical: 4,
      justifyContent: 'space-evenly',
    },
  });