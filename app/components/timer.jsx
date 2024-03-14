import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

