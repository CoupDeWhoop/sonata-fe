import { View } from "react-native";
import { Snackbar } from "react-native-paper";

const MessageSnackbar = ({ message, setMessage }) => (
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

export default MessageSnackbar;
