import { Keyboard, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AppBar } from '../../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import useHandleScroll from '../../hooks/useHandleScroll';
import { getChatDate, getChatTime } from '../../utils';
import { Fab, CItem, IChat } from '../../components';

const ChatScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const scrollViewRef = useRef();
  const [chatContent, setChatContent] = useState('');
  const [chatData, setChatData] = useState([]);
  const [unread, setUnread] = useState(0);

  const { handleScroll, showButton } = useHandleScroll();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const setDatabase = (url, urlChild, method, data) => {
    const base = database().ref(url).child(urlChild);

    if (method === 'push') {
      return base.push(data);
    } else if (method === 'set') {
      return base.set(data);
    }

    return base;
  };

  const chatID =
    auth().currentUser.uid < params.item.uid
      ? `${auth().currentUser.uid}_${params.item.uid}`
      : `${params.item.uid}_${auth().currentUser.uid}`;

  const chatSend = () => {
    dismissKeyboard();
    const today = new Date();

    const urlChild = `${chatID}/messages/${getChatDate(today)}`;
    const urlHistoryUser = `/${auth().currentUser.uid}/${chatID}`;
    const urlHistoryOponent = `/${params.item.uid}/${chatID}`;

    const dataHistoryChatUser = {
      lastChat: chatContent,
      lastChatDate: today.getTime(),
      uidOponent: params.item.uid,
      sendBy: auth().currentUser.uid,
      countUnread: unread + 1,
      read: false,
    };

    const dataHistoryChatOponent = {
      lastChat: chatContent,
      lastChatDate: today.getTime(),
      uidOponent: auth().currentUser.uid,
      sendBy: auth().currentUser.uid,
      countUnread: unread + 1,
      read: false,
    };

    const data = {
      sendBy: auth().currentUser.uid,
      chatDate: new Date().getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
      isRead: false,
    };

    setDatabase('chats', urlChild, 'push', data)
      .then(() => {
        setDatabase('history', urlHistoryUser, 'set', dataHistoryChatUser);

        setDatabase(
          'history',
          urlHistoryOponent,
          'set',
          dataHistoryChatOponent,
        );

        setUnread(prev => prev + 1);
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err.message,
          text2: 'Something went wrong',
        });
      });

    setChatContent('');
  };

  useEffect(() => {
    const urlFire = `/${chatID}/messages`;

    const onValueChange = setDatabase('chats', urlFire)
      .limitToLast(1)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const allChat = [];
          const data = snapshot.val();
          const keys = Object.keys(data);

          keys.forEach(key => {
            const datas = [];
            const dataChat = data[key];
            const keysChat = Object.keys(dataChat);

            keysChat.forEach(keyChat => {
              datas.push({
                id: keyChat,
                data: dataChat[keyChat],
              });
            });

            const sortDatas = datas.sort(
              (a, b) => a.data.chatDate - b.data.chatDate,
            );

            allChat.unshift({
              id: key,
              datas: sortDatas,
            });
          });

          setChatData(allChat);
        }
      });

    return () => {
      database().ref(urlFire).off('value', onValueChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const urlHistoryUser = `/${auth().currentUser.uid}/${chatID}`;
    const urlHistoryOponent = `/${params.item.uid}/${chatID}`;

    chatData.map(chatting => {
      chatting.datas.forEach(chat => {
        if (chat.data.sendBy !== auth().currentUser.uid) {
          setDatabase(
            'chats',
            `${chatID}/messages/${chatting.id}/${chat.id}`,
          ).update({
            isRead: true,
          });
        }
      });
      const findLastChat = chatting.datas.findLast(chat => chat.data.sendBy);

      if (findLastChat.data.sendBy !== auth().currentUser.uid) {
        setDatabase('history', urlHistoryUser).update({
          countUnread: 0,
          read: true,
        });
        setDatabase('history', urlHistoryOponent).update({
          countUnread: 0,
          read: true,
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatData]);

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
              {item?.datas?.map(chat => {
                return (
                  <CItem
                    key={chat.id}
                    isAuth={chat.data.sendBy === auth().currentUser.uid}
                    text={chat.data.chatContent}
                    date={chat.data.chatTime
                      .trim()
                      .split(':')[0]
                      .concat(':')
                      .concat(chat.data.chatTime.trim().split(':')[1])}
                  />
                );
              })}
            </View>
          );
        })}
      </InvertibleScrollView>
      <IChat
        placeholder={'Type a message...'}
        value={chatContent}
        changeText={text => {
          setChatContent(text);
        }}
        onPress={chatSend}
      />
      {showButton && (
        <Fab
          icon={'arrow-down'}
          onPress={() => {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          }}
          bottomOffset={100}
        />
      )}
    </>
  );
};

export default ChatScreen;
