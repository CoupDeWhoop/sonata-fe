return selectedLearningFocusList.list.map((note, index) => {
  const currentDate = new Date(note.timestamp).toDateString();
  const showDate = currentDate !== previousDate; // Check if it needs a new date title
  previousDate = currentDate;

  return (
    <View style={styles.day} key={index}>
      {showDate ? (
        <Text variant="titleMedium" style={styles.date}>
          {formatDate(note.timestamp)}
        </Text>
      ) : null}
      <PracticeCard
        notes={note.noteContent}
        timestamp={note.timestamp}
        duration={note.duration}
        learningFocus={note.learning_focus}
      />
    </View>
  );
});
