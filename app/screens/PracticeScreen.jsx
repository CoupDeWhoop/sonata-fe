import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { getPractices, configureAxiosHeader, refreshTokens, setTokens  } from '../../utils/api';
import { Paragraph, Title } from 'react-native-paper';
import PracticeCalendar from '../components/PracticeCalendar';

export default PracticeScreen = () => {
    const [practises, setPractises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const practicesApiCall = async() => {
            try {
                const result = await getPractices()
                setPractises(result);
                setLoading(false)
            } catch (error) {
                console.log(error.message);
                if (error.response && error.response.status === 403) {
                  try {
                    const { tokens } = await refreshTokens();
                    await setTokens(tokens.accessToken, tokens.refreshToken)
                    configureAxiosHeader(tokens.accessToken)
        
                    const result = await getPractices();
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

        practicesApiCall()
    }, [])

    if (loading) return <Paragraph>Wait</Paragraph>;

    return (
        <View>
            {
                practises.map((practice, index) => (
                    <View key={index}>
                        <Title>{practice.practice_id}</Title>
                        <Paragraph>{practice.practice_timestamp}</Paragraph>
                    </View>
                ))
            }
            <View style={{ width: 400}}>
                <Title>Nivo Calendar</Title>
                <PracticeCalendar />
            </View>
        </View>
    )
}