import React, { useState, createContext } from 'react'

export const LessonModalContext = createContext();

export const LessonModalProvider = ({ children }) => {
    const [lessonModalIsVisible, setLessonModalIsVisible] = useState(false)
    const [lessons, setLessons] = useState([])
    const value = {
      lessonModalIsVisible,
      setLessonModalIsVisible,
      lessons,
      setLessons
    }
    return (
      <LessonModalContext.Provider value={value}>
        {children}
      </LessonModalContext.Provider>
    )
  }