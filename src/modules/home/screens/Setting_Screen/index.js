import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import { AppBar, Gap } from '../../../../components';
import { DialogAlert } from '../../components';
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [visible, setVisible] = useState(false);

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
          <Text style={{ fontSize: 20, fontWeight: '800' }}>{params.name}</Text>
          <Gap height={8} />
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            {auth().currentUser.email}
          </Text>
          <Gap height={28} />
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
