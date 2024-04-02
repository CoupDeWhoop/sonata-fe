import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { commonStyles } from "../../styles/common-styles";

const Loading = () => (
  <View style={commonStyles.layout}>
    <ActivityIndicator
      animating={true}
      size={"large"}
      style={{ paddingTop: 24 }}
      color={MD2Colors.pink200}
    />
  </View>
);

export default Loading;
