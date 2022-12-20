import { Text, View } from 'react-native';
import React from 'react';

const CIAuth = ({ text, date }) => {
  return (
    <View
      style={{ marginBottom: 20, alignItems: 'flex-end', paddingRight: 16 }}>
      <View
        style={{
          maxWidth: '70%',
          padding: 12,
          paddingRight: 18,
          backgroundColor: '#B6D4E9',
          borderRadius: 10,
          borderBottomRightRadius: 0,
        }}>
        <Text style={{ fontSize: 14 }} selectable={true}>
          {text}
        </Text>
      </View>

      <Text style={{ fontSize: 11, marginTop: 8, textAlign: 'right' }}>
        {date}
      </Text>
    </View>
  );
};

export default CIAuth;
