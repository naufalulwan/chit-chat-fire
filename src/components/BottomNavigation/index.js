import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

const BottomNavigator = ({ state, navigation }) => {
  const [routes] = useState([
    {
      key: state.routeNames[0],
      title: 'Chat',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
    },
    {
      key: state.routeNames[1],
      title: state.routeNames[1],
      focusedIcon: 'account-cog',
      unfocusedIcon: 'account-cog-outline',
    },
  ]);

  return (
    <View style={{ height: 80 }}>
      <BottomNavigation
        navigationState={{ index: state.index, routes }}
        onIndexChange={index => navigation.jumpTo(state.routes[index].name)}
        renderScene={route => {}}
      />
    </View>
  );
};

export default BottomNavigator;
