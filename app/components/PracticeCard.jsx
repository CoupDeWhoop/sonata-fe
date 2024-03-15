import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper'


export default PracticeCard = (props) => {
    const options = {
        day: "numeric", 
        month: "long", 
      };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(new Date(props.timestamp));
    return (
        <View style={styles.layout}>
            <Text variant="titleMedium" style={styles.date}>{formattedDate}</Text>
            <Card>
                <Card.Title
                    title="Practice"
                    subtitle={`${props.duration} min`}
                    left={(props) => <Avatar.Icon {...props} icon="bugle" />}
                    right={() => <Text>{new Date(props.timestamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })}</Text>}
                    rightStyle={{paddingRight: 16}}
                />
            </Card>
        </View>

    )
}

const styles = StyleSheet.create({
    layout: {
        marginVertical: 8,
      },
    date: {
        paddingBottom: 8
    }


})

