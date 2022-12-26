import * as React from 'react';
import { View } from 'react-native';

import { Avatar, Badge, Card, Text, TouchableRipple } from 'react-native-paper';
import { Gap } from '../../../../components';

const PCard = ({
  title,
  subTitle,
  isOponent,
  label,
  date,
  seening,
  onPress,
  onLongPress,
}) => (
  <TouchableRipple onPress={onPress} onLongPress={onLongPress}>
    <Card.Title
      title={title}
      subtitle={subTitle}
      titleVariant="titleMedium"
      subtitleVariant="labelLarge"
      titleStyle={{ color: '#2c3e50' }}
      subtitleStyle={{
        color: isOponent ? (seening === 0 ? '#7f8c8d' : '#34495e') : '#7f8c8d',
      }}
      left={props => <Avatar.Text {...props} label={label} />}
      right={() => (
        <View style={{ marginRight: 14, marginBottom: isOponent ? 0 : 16 }}>
          <Text style={{ fontSize: 12 }}>{date}</Text>
          <Gap height={seening ? 6 : 10} />
          {isOponent && (
            <Badge
              size={seening ? 18 : 10}
              style={{ backgroundColor: seening ? 'red' : 'green' }}>
              {seening ? seening : ''}
            </Badge>
          )}
        </View>
      )}
    />
  </TouchableRipple>
);

export default PCard;
