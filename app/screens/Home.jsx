import { StyleSheet, View, Text} from 'react-native';
import { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getLessons } from '../../utils/api';

const LeftContent = props => <Avatar.Icon {...props} icon="bugle" />

const Home = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {

        const lessonsApiCall = async() => {
            try {
                const result = await getLessons();
                setLessons(result);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(error)
            }

        };
        lessonsApiCall();
    }, []);

    return (
      <View style={styles.container}>
        {loading?  <Text>Wait</Text> : 
        <Card style={styles.card}>
            <Card.Title title={lessons[0].lesson_id} subtitle={lessons[0].lesson_timestamp} left={LeftContent} />
            <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions>
        </Card> }
      </View>
    );
}

const styles = StyleSheet.create({
    // image: {
    //     width: '50%',
    //     height: '50%',
    //     resizeMode: 'contain',
    // },
    card: {
        padding: 10,
        width: '100%'
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    container: {
        alignItems: 'center',
        padding:5,
        width: '100%'
    }

})

export default Home;