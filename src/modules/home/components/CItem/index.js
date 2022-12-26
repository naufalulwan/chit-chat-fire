import { Text, View } from 'react-native';
import React from 'react';
import CIAuth from './CIAuth';

const CItem = ({ isAuth, text, date }) => {
  if (isAuth) {
    return <CIAuth text={text} date={date} />;
  }
  return (
    <View
      style={{ marginBottom: 14, alignItems: 'flex-start', paddingLeft: 16 }}>
      <View
        style={{
          maxWidth: '70%',
          padding: 12,
          paddingRight: 18,
          backgroundColor: '#bdc3c7',
          borderRadius: 10,
          borderBottomLeftRadius: 0,
        }}>
        <Text style={{ fontSize: 14 }} selectable={true}>
          {text}
        </Text>
      </View>
      <Text style={{ fontSize: 11, marginTop: 4, textAlign: 'left' }}>
        {date}
      </Text>
    </View>
  );
};

export default CItem;
