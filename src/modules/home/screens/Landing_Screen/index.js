import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { AppBar } from '../../../../components';
import PCard from '../../components/PCard';

const LandingScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const urlHistory = `/${auth().currentUser.uid}`;

    database()
      .ref('history')
      .child(urlHistory)
      .on('value', async snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          const newData = [];
          const promise = Object.keys(data).map(async key => {
            const urlOponent = `/${data[key].uidOponent}`;

            const oponent = await database()
              .ref('users')
              .child(urlOponent)
              .once('value');

            newData.unshift({
              id: key,
              oponent: oponent.val(),
              ...data[key],
            });
          });

          await Promise.all(promise);

          setHistory(newData);
        }
      });
  }, []);

  return (
    <>
      <AppBar title="Chit Chat" />
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {history.map(data => {
          const item = data.oponent;
          return (
            <PCard
              key={data.id}
              title={item.name}
              subTitle={data.lastChat}
              label={item.name[0]}
              onPress={() => {
                navigation.navigate('Chat', { item });
              }}
            />
          );
        })}
      </ScrollView>
      <FAB
        icon="plus"
        size="medium"
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        onPress={() => {
          navigation.navigate('Start');
        }}
      />
    </>
  );
};

export default LandingScreen;
