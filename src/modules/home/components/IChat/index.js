import { View } from 'react-native';
import React, { useState } from 'react';
import { IconButton, TextInput } from 'react-native-paper';

const IChat = ({ placeholder, value, changeText, onPress }) => {
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
          maxHeight: 120,
        }}
        value={value}
        onChangeText={changeText}
        mode="outlined"
        placeholder={placeholder}
        multiline
      />
      <IconButton
        mode="contained"
        icon="send"
        disabled={value === ''}
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
