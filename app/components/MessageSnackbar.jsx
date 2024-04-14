import { View } from "react-native";
import { Snackbar } from "react-native-paper";

export default MessageSnackbar = ({ message, setMessage }) => (
  <View>
    <Snackbar
      visible={message}
      onDismiss={() => setMessage(null)}
      action={{
        label: "Close",
      }}
    >
      {message}
    </Snackbar>
  </View>
);
