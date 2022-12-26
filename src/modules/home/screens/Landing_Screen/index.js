import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { AppBar, Gap } from '../../../../components';
import { Fab, PCard } from '../../components';
import { Text } from 'react-native-paper';

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
              isOponent: data[key].sendBy !== auth().currentUser.uid,
              ...data[key],
            });
          });

          await Promise.all(promise);

          const sortingNewData = newData.sort(
            (a, b) => b.lastChatDate - a.lastChatDate,
          );

          setHistory(sortingNewData);
        }
      });
  }, []);

  return (
    <>
      <AppBar title="Chit Chat" iconContent={'trash-can-outline'} />
      {history !== null ? (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          {history.map(data => {
            const item = data.oponent;
            const convertDate = new Date(data.lastChatDate);
            const currentDate = new Date();
            const isToday =
              currentDate.getDate().toLocaleString('id-ID') ===
              convertDate.getDate().toLocaleString('id-ID');

            const currentTime = convertDate
              .toLocaleString('id-ID')
              .split(' ')[1]
              .trim()
              .split('.')[0]
              .concat('.')
              .concat(convertDate.toLocaleString('id-ID').split('.')[1]);

            return (
              <PCard
                key={data.id}
                title={item?.name}
                subTitle={data.lastChat}
                label={item?.name[0]}
                date={
                  isToday
                    ? currentTime
                    : currentDate.toLocaleString('id-ID').split(' ')[0]
                }
                seening={!data.read ? data.countUnread : 0}
                isOponent={data.isOponent}
                onPress={() => {
                  navigation.navigate('Chat', { item });
                }}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            Hihi, riwayat chating kamu kosong
          </Text>
          <Gap height={10} />
          <Text style={{ fontSize: 16, fontWeight: '400' }}>
            yuk klik tombol chat '+' di bawah
          </Text>
        </View>
      )}
      <Fab
        icon={'chat-plus'}
        onPress={() => {
          navigation.navigate('Start');
        }}
      />
    </>
  );
};

export default LandingScreen;
