import * as react from 'react';
import { FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';

const LearningFocusCard = ({ learningFocus }) => (
    <Card style={{margin: 2}}>
        <Card.Content>
        <Text variant="labelLarge" >{learningFocus}</Text>
        </Card.Content>
    </Card>
)

export const LearningFocusList = ({lessons}) => (
    <FlatList 
        style={{flexGrow: 0, flexShrink: 0}}
        horizontal={true}
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={( {item }) => item.notes.map((note) => <LearningFocusCard key={note.note_id}learningFocus={note.learning_focus} />)}
    />
)