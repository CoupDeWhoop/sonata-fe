import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { getLessons, getPractises } from '../utils/api.js';
const AppContext = createContext()

const AppProvider = ({ children }) => {
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

    // if (loading) {
    //     return <Te>Loading...</p>; 
    // }

    // if (error) {
    //     return <p>Error: {error.message}</p>;
    // }

    const value = {
        lessons,
        practises
    };
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export default AppProvider;
