import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native';
import { getPractises } from '../utils/apiCalls';
import { Paragraph, Title } from 'react-native-paper';
import { commonStyles } from '../../styles/common-styles';
import PracticeCalendar from '../components/PracticeCalendar';
import PracticeCard from '../components/PracticeCard';

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

    return (
        <View style={commonStyles.layout}>
            <ScrollView >
                {

                    practises.map((practice) => (
                        <PracticeCard key={practice.practice_id} notes={practice.notes} timestamp={practice.practice_timestamp} duration={practice.duration}/>
                    ))
                }
                <View>
                    <Title>Calendar</Title>
                    <PracticeCalendar practises={practises}/>
                </View>
            </ScrollView>
        </View>

    )
}
