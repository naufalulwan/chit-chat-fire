import React from 'react';
import { Button } from 'react-native-paper';

const AButton = props => {
  const { label, onPress, disabled } = props;

  return (
    <Button mode="contained" onPress={onPress} disabled={disabled}>
      {label}
    </Button>
  );
};

export default AButton;
