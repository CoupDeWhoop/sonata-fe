import { View } from "react-native";
import { Snackbar } from "react-native-paper";

export default MessageSnackbar = ({
  message,
  messageVisible,
  setMessageVisible,
}) => (
  <View>
    <Snackbar
      visible={messageVisible}
      onDismiss={() => setMessageVisible(false)}
      action={{
        label: "Close",
      }}
    >
      {message}
    </Snackbar>
  </View>
);
