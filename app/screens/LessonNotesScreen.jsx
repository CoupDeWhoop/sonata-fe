import { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from "react-native"
import { Button, Card, MD2Colors, Modal, Snackbar, Text, TextInput } from "react-native-paper"
import { formatDate, formatTime, postNote } from '../utils';
import { LearningFocusList } from '../components/LearningFocusList';


export default LessonNotesScreen = ({lesson, setNewLesson, lessons}) => {
    const [errorVisible, setErrorVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [learningFocus, setLearningFocus] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const learningFocusInputRef = useRef(null);
    const notesInputRef = useRef(null);


    const handleSubmitNote = async() => {
        if (!learningFocus || !notes) {
            setError("Learning Focus and Notes are required");
            setErrorVisible(true)
            return;
        }

        learningFocusInputRef.current.blur();
        notesInputRef.current.blur();
        setIsSubmitting(true)

        const newNote = {
            learning_focus: learningFocus,
            notes: notes
        }
        try {
            const postedNote = await postNote(lesson.lesson_id, newNote);
            const updatedLesson = { ...lesson}.notes.push(postedNote);
            setNewLesson(updatedLesson);
            setLearningFocus('');
            setNotes('');
            setModalVisible(false)
            setIsSubmitting(false)
        } catch (err) {
            console.log(err);
            setError(err)
        }

    }

    const Label = (text) => <Text style={{color: MD2Colors.grey500}}>{text}</Text>;

    return (
        <View style={{flex: 1, padding: 16, paddingBottom: 8}}>
            <Text style={styles.title} variant="titleLarge">{`${formatDate(lesson.lesson_timestamp, 'long')} - ${formatTime(lesson.lesson_timestamp)}`}</Text>
            <FlatList
                contentContainerStyle={{ marginTop: 16, paddingBottom: 4}}
                data={lesson.notes}
                keyExtractor={(item) => item.note_id}
                renderItem={( {item }) => (
                    <View>
                        <Card style={styles.card}>
                            <Card.Title
                                title={item.learning_focus}
                            />
                            <Card.Content>
                                <Text variant="bodyMedium">{item.notes}</Text>
                            </Card.Content>
                        </Card>
                    </View>
                )}
            />
            <Button 
                mode={'contained'} 
                onPress={() => setModalVisible(true)}
            >
                Add Note
            </Button>
            <Modal 
                style={styles.modal} 
                visible={modalVisible} 
                onDismiss={() => setModalVisible(false)}
                theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.6)" }}}
            >
                <LearningFocusList lessons={lessons} setLearningFocus={setLearningFocus} />
                <TextInput 
                    ref={learningFocusInputRef} 
                    style={styles.learningFocusInput} 
                    mode={'outlined'} 
                    label={Label('Learning Focus')}
                    value={learningFocus}
                    onChangeText={text => setLearningFocus(text)}
                />
                <TextInput 
                    ref={notesInputRef} 
                    style={styles.noteInput} 
                    mode={'outlined'} 
                    multiline={true}
                    placeholder='Lesson Notes'
                    placeholderTextColor={MD2Colors.grey500}
                    value={notes}
                    onChangeText={text => setNotes(text)}
                />
                <Button 
                    mode="contained" 
                    style={styles.submitButton}
                    buttonColor={MD2Colors.pink200} 
                    labelStyle={{fontSize: 14}} 
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onPress={handleSubmitNote}>
                    Add Note
                </Button>
            </Modal>
            <View>
                <Snackbar
                    visible={errorVisible}
                    onDismiss={() => setErrorVisible(false)}
                    action={{
                        label: 'Close'
                    }}>
                    Learning Focus and Notes are required
                </Snackbar>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center'
    },
    card: {
        margin: 2,
        marginBottom:4,
        backgroundColor: 'white',
    },
    modal: {
        margin: 16
    },
    learningFocusInput: {
        backgroundColor: 'white',
        marginBottom: 8,
    
    },
    noteInput: {
        height: 140,
        backgroundColor: 'white',
        textAlignVertical: 'top'
    },
    submitButton: {
        marginTop: 4,
        
        },
  });