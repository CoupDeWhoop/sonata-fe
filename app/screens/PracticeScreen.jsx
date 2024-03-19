import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { getPractises } from '../utils/api';
import { Paragraph, Text, Title } from 'react-native-paper';
import { commonStyles } from '../../styles/common-styles';
import PracticeCalendar from '../components/PracticeCalendar';
import PracticeCard from '../components/PracticeCard';
import { formatDate } from '../utils';
import { SafeAreaView } from 'react-native-safe-area-context';

export default PracticeScreen = () => {
    const [practises, setPractises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchPractises = async () => {
          try {
            const result = await getPractises();
            setPractises(result);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setError(error);
          }
        };
      
        fetchPractises();
      }, []);

    if (loading) return <Paragraph>Wait</Paragraph>;

    let previousDate = null;

    return (
      <SafeAreaView style={commonStyles.layout}>
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
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  date: {
    paddingBottom: 4,
    paddingTop: 16
  }
})
