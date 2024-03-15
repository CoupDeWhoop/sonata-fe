import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = () => (
  <ActivityIndicator animating={true} size={'large'} style={{paddingTop: 24}} color={MD2Colors.pink200} />
);

export default Loading;