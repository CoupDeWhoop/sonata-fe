import * as react from 'react';
import { FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';


export const LearningFocusList = ({lessons, setLearningFocus}) => (
    <FlatList 
        style={{flexGrow: 0, flexShrink: 0}}
        horizontal={true}
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={( {item }) => item.notes.map((note) => (
            <Card 
                style={{margin: 2}} 
                onPress={() => setLearningFocus(note.learning_focus)}
            >
                <Card.Content>
                <Text variant="labelLarge" >{note.learning_focus}</Text>
                </Card.Content>
            </Card>
        ))}
    />
)