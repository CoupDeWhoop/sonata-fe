import React, { useState, createContext, useEffect } from "react";
import { getAllNotes } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export const PracticeModalContext = createContext();

export const PracticeModalProvider = ({ children }) => {
  const { authState } = useAuth();
  const [practiceModalIsVisible, setPracticeModalIsVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({});
  const [newPractice, setNewPractice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllNotes();
        setNotes(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (authState.authenticated) fetchData();
  }, [authState, newNote]);

  const value = {
    practiceModalIsVisible,
    setPracticeModalIsVisible,
    notes,
    setNotes,
    newPractice,
    setNewPractice,
    newNote,
    setNewNote,
  };

  return (
    <PracticeModalContext.Provider value={value}>
      {children}
    </PracticeModalContext.Provider>
  );
};
