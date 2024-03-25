import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { getPractises } from '../utils/api';
import { Paragraph, Text, Title } from 'react-native-paper';
import { commonStyles } from '../../styles/common-styles';
import PracticeCalendar from '../components/PracticeCalendar';
import PracticeCard from '../components/PracticeCard';
import { formatDate } from '../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign.js';
import { PracticeModalContext } from '../context/PracticeModalContext';
import { AppContext } from '../context/AppProvider';
import { LearningFocusList } from '../components/LearningFocusList';

export default PracticeScreen = () => {
    const { practises, loading } = useContext(AppContext);
    const { setPracticeModalIsVisible } = useContext(PracticeModalContext)

    if (loading) return <Paragraph>Wait</Paragraph>;

    let previousDate = null;

    return (
        <SafeAreaView style={commonStyles.layout}>
            <Title>Last Practice</Title>
            <Text>{formatDate(practises[practises.length -1].practice_timestamp)}</Text>
            <Title>Recent learning focus</Title>
            <LearningFocusList />
            <ScrollView horizontal={true}>

            </ScrollView>
            <ScrollView>
                {practises.map((practice, index) => {
                    const currentDate = new Date(practice.practice_timestamp).toDateString();
                    const showDate = currentDate !== previousDate; // Check if it's a new date

                    previousDate = currentDate; // Update previousDate

                    return (
                        <View style={styles.day} key={index}>
                            {showDate ? <Text variant="titleMedium" style={styles.date}>{formatDate(practice.practice_timestamp)}</Text> : null}
                            <PracticeCard
                                notes={practice.notes}
                                timestamp={practice.practice_timestamp}
                                duration={practice.duration}
                            />
                        </View>
                    );
                })}
                    <View>
                        <Title>Calendar</Title>
                        <PracticeCalendar practises={practises}/>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.addButton} >
                <Icon name="pluscircle" size={54} color="tomato" onPress={() => setPracticeModalIsVisible(true)}/>
                </TouchableOpacity>
            </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  date: {
    paddingBottom: 4,
    paddingTop: 16
  }
})
