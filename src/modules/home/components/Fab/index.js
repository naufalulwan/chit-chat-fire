import React from 'react';
import { FAB } from 'react-native-paper';

const Fab = ({ icon, onPress, bottomOffset }) => {
  return (
    <FAB
      icon={icon}
      size="medium"
      style={{
        position: 'absolute',
        margin: 16,
        marginBottom: bottomOffset,
        right: 0,
        bottom: 0,
      }}
      onPress={onPress}
    />
  );
};

export default Fab;
