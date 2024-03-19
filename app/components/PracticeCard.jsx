import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper'


export default PracticeCard = (props) => {
    return (
        <View style={styles.layout}>
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
        margin: 2,
      },
    date: {
        paddingBottom: 8
    }


})

