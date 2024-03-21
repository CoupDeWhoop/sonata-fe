import React, { useState, createContext, useEffect } from 'react'
import { getPractises } from '../utils';

export const PracticeModalContext = createContext();

export const PracticeModalProvider = ({ children }) => {
    const [practiceModalIsVisible, setPracticeModalIsVisible] = useState(false);
    const [practices, setPractices] = useState([]);
    const [newPractice, setNewPractice] = useState([]);

    useEffect(() => {
      fetchPractises = async() => {
        try {
          const practiceData = await getPractises();
          setPractices(practiceData);
        } catch (error) {
          console.log(error);
        }
      }
      fetchPractises()
    }, [newPractice,])

    const value = {
      practiceModalIsVisible,
      setPracticeModalIsVisible,
      practices,
      setPractices,
      newPractice,
      setNewPractice
    }

    return (
      <PracticeModalContext.Provider value={value}>
        {children}
      </PracticeModalContext.Provider>
    )
  
  }