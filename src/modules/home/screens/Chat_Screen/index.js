import { Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AppBar } from '../../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import CItem from '../../components/CItem';
import InputChats from '../../components/IChat';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { FAB } from 'react-native-paper';
import useHandleScroll from '../../hooks/useHandleScroll';

const ChatScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const scrollViewRef = useRef();
  const [chatContent, setChatContent] = useState('');
  const [chatData, setChatData] = useState([]);
  const { handleScroll, showButton } = useHandleScroll();

  const chatSend = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();

    const chatID =
      auth().currentUser.uid < params.item.uid
        ? `${auth().currentUser.uid}_${params.item.uid}`
        : `${params.item.uid}_${auth().currentUser.uid}`;
    const urlChild = `${chatID}/messages/${year}-${month}-${date}`;
    const urlHistoryUser = `/${auth().currentUser.uid}/${chatID}`;
    const urlHistoryiOponent = `/${params.item.uid}/${chatID}`;

    const dataHistoryChatUser = {
      lastChat: chatContent,
      lastChatDate: today.getTime(),
      uidOponent: params.item.uid,
    };

    const dataHistoryChatOponent = {
      lastChat: chatContent,
      lastChatDate: today.getTime(),
      uidOponent: auth().currentUser.uid,
    };

    const data = {
      sendBy: auth().currentUser.uid,
      chatDate: new Date().getTime(),
      chatTime: `${time}`,
      chatContent: chatContent,
    };

    database()
      .ref('chats')
      .child(urlChild)
      .push(data)
      .then(res => {
        setChatContent('');
        // set history for user
        database()
          .ref('history')
          .child(urlHistoryUser)
          .set(dataHistoryChatUser);

        // set history for oponent
        database()
          .ref('history')
          .child(urlHistoryiOponent)
          .set(dataHistoryChatOponent);
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err.message,
          text2: 'Something went wrong',
        });
      });
  };

  useEffect(() => {
    const chatID =
      auth().currentUser.uid < params.item.uid
        ? `${auth().currentUser.uid}_${params.item.uid}`
        : `${params.item.uid}_${auth().currentUser.uid}`;
    const urlFire = `chats/${chatID}/messages`;

    database()
      .ref(urlFire)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          const allChat = [];

          Object.keys(data).map(key => {
            const chat = snapshot.val()[key];
            const newData = [];

            Object.keys(chat).map(item => {
              newData.unshift({
                id: item,
                data: chat[item],
              });
            });

            allChat.push({
              id: key,
              data: newData,
            });
          });

          setChatData(allChat);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar
        title={params.item.name}
        backButton={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <InvertibleScrollView
        inverted
        ref={scrollViewRef}
        onScroll={handleScroll}
        style={{ flex: 1 }}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }}>
        {chatData?.map(item => {
          return (
            <View key={item.id}>
              <View style={{ marginTop: 14, marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  {item.id}
                </Text>
              </View>
              {item?.data?.map(chat => {
                return (
                  <CItem
                    key={chat.id}
                    isAuth={chat.data.sendBy === auth().currentUser.uid}
                    text={chat.data.chatContent}
                    date={chat.data.chatTime}
                  />
                );
              })}
            </View>
          );
        })}
      </InvertibleScrollView>
      <InputChats
        placeholder={`Tulis pesan untuk ${params.item.name}`}
        value={chatContent}
        changeText={text => {
          setChatContent(text);
        }}
        onPress={chatSend}
      />
      {showButton && (
        <FAB
          icon="arrow-down"
          size="medium"
          style={{
            position: 'absolute',
            margin: 16,
            marginBottom: 100,
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          }}
        />
      )}
    </>
  );
};

export default ChatScreen;
