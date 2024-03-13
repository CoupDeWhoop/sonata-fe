import React, { useState, createContext } from 'react'

export const LessonModalContext = createContext();

export const LessonModalProvider = ({ children }) => {
    const [lessonModalIsVisible, setLessonModalIsVisible] = useState(false)
    const value = {
      lessonModalIsVisible,
      setLessonModalIsVisible
    }
    return (
      <LessonModalContext.Provider value={value}>
        {children}
      </LessonModalContext.Provider>
    )
  }