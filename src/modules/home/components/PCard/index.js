import * as React from 'react';

import { Avatar, Card, TouchableRipple } from 'react-native-paper';

const PCard = ({ title, subTitle, label, onPress, onLongPress }) => (
  <TouchableRipple onPress={onPress}>
    <Card.Title
      title={title}
      subtitle={subTitle}
      titleVariant="titleMedium"
      subtitleVariant="labelLarge"
      titleStyle={{ color: '#2c3e50' }}
      subtitleStyle={{ color: '#7f8c8d' }}
      left={props => <Avatar.Text {...props} label={label} />}
    />
  </TouchableRipple>
);

export default PCard;
