import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { getLessons, getPractises } from '../utils/api.js';

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const { authState } = useAuth();
    const [lessons, setLessons] = useState(null);
    const [practises, setPractises] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authState.authenticated) {
            const fetchData = async () => {
                try {
                    const lessonsResult = await getLessons();
                    setLessons(lessonsResult);

                    const practisesResult = await getPractises();
                    setPractises(practisesResult);
                } catch (error) {
                    setError(error);
                    console.error(error);
                } finally {
                    setLoading(false); 
                }
            };

            fetchData();
        }
    }, [authState]);

    const updateLessons = async () => {
        try {
            const lessonsResult = await getLessons();
            setLessons(lessonsResult);
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    const updatePractises = async () => {
        try {
            const practisesResult = await getPractises();
            setPractises(practisesResult);
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    const value = {
        lessons,
        practises,
        loading,
        updateLessons,
        updatePractises
    };
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

