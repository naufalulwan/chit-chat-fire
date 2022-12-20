import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import { AppBar, Gap } from '../../../../components';
import { DialogAlert } from '../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    database()
      .ref('users')
      .child(auth().currentUser.uid)
      .child('name')
      .on('value', snapshot => {
        setName(snapshot.val());
      });
  }, []);

  const handleLogout = () => {
    setVisible(false);
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace('Login'));
      });
  };

  return (
    <>
      <AppBar title="Setting" />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '800' }}>{name}</Text>
          <Gap height={8} />
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            {auth().currentUser.email}
          </Text>
          <Gap height={20} />
          <Button
            mode="outlined"
            onPress={() => {
              setVisible(true);
            }}>
            Logout
          </Button>
          <DialogAlert
            title={'Logout'}
            subTitle={'Are you sure you want to logout?'}
            visible={visible}
            setVisible={setVisible}
            callback={handleLogout}
          />
        </View>
      </View>
    </>
  );
};

export default SettingScreen;
