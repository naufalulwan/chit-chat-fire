import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppBar } from '../../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PCard } from '../../components';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const StartScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    database()
      .ref('users')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const filterData = Object.values(data).filter(
            item => item.uid !== auth().currentUser.uid,
          );
          setUsers(filterData);
        }
      });
  }, []);

  return (
    <>
      <AppBar
        title="Start Chat"
        backButton={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {users.map(item => {
          return (
            <PCard
              key={item.uid}
              title={item.name}
              label={item.name.charAt(0).toUpperCase()}
              onPress={() => {
                navigation.dispatch(StackActions.replace('Chat', { item }));
              }}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

export default StartScreen;
