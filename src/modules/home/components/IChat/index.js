import { View } from 'react-native';
import React, { useState } from 'react';
import { IconButton, TextInput } from 'react-native-paper';

const IChat = ({ placeholder, value, changeText, onPress }) => {
  const [height, setHeight] = useState(0);
  return (
    <View
      style={{
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          flex: 1,
          style: { height: Math.max(35, height) },
          paddingBottom: 0,
          paddingTop: 0,
        }}
        value={value}
        onChangeText={changeText}
        mode="outlined"
        placeholder={placeholder}
        onContentSizeChange={e => {
          setHeight(e.nativeEvent.contentSize.height);
        }}
        multiline
      />
      <IconButton
        mode="contained"
        icon="send"
        style={{
          height: 50,
          marginLeft: 14,
          width: 60,
          borderRadius: 8,
          marginBottom: 0,
        }}
        onPress={onPress}
      />
    </View>
  );
};

export default IChat;
