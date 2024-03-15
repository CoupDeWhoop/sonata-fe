import React, { useState } from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-paper';

const TextInputBox = () => {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
};
export default TextInputBox;