import react, {useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { AppContext } from '../context/AppProvider';
import { formatDate } from '../utils';


export const LearningFocusList = ({ setLearningFocus }) => {

    const { lessons, practises } = useContext(AppContext);

    const allData = [...lessons, ...practises];

    const organizedData = {};
    
    allData.forEach(item => {
        if (item.notes) {
            item.notes.forEach(note => {
                const timestamp = item.lesson_timestamp || item.practice_timestamp;
                if (!organizedData[note.learning_focus]) {
                    organizedData[note.learning_focus] = [];
                }
                organizedData[note.learning_focus].push({
                    type: item.lesson_timestamp ? 'lesson' : 'practice',
                    id: item.lesson_id || item.practice_id,
                    timestamp: timestamp,
                    duration: item.duration,
                    noteId: note.note_id,
                    noteContent: note.note_content
                });
            });
        }

    });
    
    const learningFocuses = Object.keys(organizedData);

    useEffect(() => {
        setLearningFocus((organizedData[learningFocuses[0]]))
    }, []) 

    return (
        <FlatList 
            style={{flexGrow: 0, flexShrink: 0}}
            horizontal={true}
            data={learningFocuses}
            keyExtractor={(item, index) => {
                return index
            }}
            renderItem={({item: focus}) => (
                <Card
                style={{margin: 2}} 
                onPress={() => setLearningFocus(organizedData[focus])}
                >
                    <Card.Content>
                    <Text variant="labelLarge">{focus}</Text>
                    <Text variant="labelMedium">{formatDate(organizedData[focus][0].timestamp)}</Text>
                    </Card.Content>
                </Card>
            )}
        />
    )
}