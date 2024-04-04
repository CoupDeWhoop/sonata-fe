import { Avatar, Card, Text } from "react-native-paper";

export default StatsCard = ({ color, icon, title, text }) => (
  <Card
    style={{
      flex: 1,
      backgroundColor: color,
      padding: 8,
      shadowColor: "transparent",
    }}
  >
    <Card.Title
      title={title}
      titleVariant="titleLarge"
      titleStyle={{ textAlign: "center" }}
      titleNumberOfLines={2}
      left={(props) => (
        <Avatar.Icon
          {...props}
          icon={icon}
          backgroundColor="white"
          size={50}
          color="black"
        />
      )}
    />
    <Card.Content
      style={{
        paddingTop: 8,
        alignItems: "center",
      }}
    >
      <Text variant="bodyLarge">{text}</Text>
    </Card.Content>
  </Card>
);
