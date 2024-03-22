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

export default PracticeScreen = () => {
    const [practises, setPractises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { setPracticeModalIsVisible } = useContext(PracticeModalContext)

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
