import React, { useState, createContext } from 'react'

export const PracticeModalContext = createContext();

export const PracticeModalProvider = ({ children }) => {
    const [practiceModalIsVisible, setPracticeModalIsVisible] = useState(false);
    const [practises, setPractises] = useState([]);
    const [newPractice, setNewPractice] = useState([]);
    const [lessonNotes, setLessonNotes] = useState([]);

    const value = {
      practiceModalIsVisible,
      setPracticeModalIsVisible,
      practises,
      setPractises,
      newPractice,
      setNewPractice
    }

    return (
      <PracticeModalContext.Provider value={value}>
        {children}
      </PracticeModalContext.Provider>
    )
  }