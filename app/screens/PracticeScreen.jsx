import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { getPractises, configureAxiosHeader, refreshTokens, setTokens  } from '../../utils/api';
import { Paragraph, Title } from 'react-native-paper';
import { commonStyles } from '../../styles/common-styles';
import PracticeCalendar from '../components/PracticeCalendar';
import PracticeCard from '../components/PracticeCard';

export default PracticeScreen = () => {
    const [practises, setPractises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const practisesApiCall = async() => {
            try {
                const result = await getPractises()
                setPractises(result);
                setLoading(false)
            } catch (error) {
                console.log(error.message);
                if (error.response && error.response.status === 403) {
                  try {
                    const { tokens } = await refreshTokens();
                    await setTokens(tokens.accessToken, tokens.refreshToken)
                    configureAxiosHeader(tokens.accessToken)
                    const result = await getPractises();
                    setPractises(result);
                    setLoading(false);
                  } catch (refreshError) {
                    console.error('Refresh token error:', refreshError.message);
                    setLoading(false);
                    setError(refreshError);
                  }
                } else {
                  setLoading(false);
                  setError(error);
                }
            }
        }

        practisesApiCall()
    }, [])

    if (loading) return <Paragraph>Wait</Paragraph>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {

                practises.map((practice) => (
                    <PracticeCard key={practice.practice_id} notes={practice.notes} timestamp={practice.practice_timestamp} duration={practice.duration}/>
                ))
            }
            <View>
                <Title>Nivo Calendar</Title>
                <PracticeCalendar practises={practises}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    }
})