import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { View } from 'react-native';

import { AForm, AButton } from '../../components';
import auth from '@react-native-firebase/auth';
import { useForm } from 'react-hook-form';
import { initialValues, schemeRegister } from '../../utils';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AppBar, Gap } from '../../../../components';
import database from '@react-native-firebase/database';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schemeRegister),
  });

  const { control, handleSubmit, setFocus } = methods;

  const handleRegister = value => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(async ref => {
        await database().ref(`users/${ref.user.uid}`).set({
          name: value.name,
          email: value.email,
          password: value.password,
          uid: ref.user.uid,
        });
        Toast.show({
          type: 'success',
          text1: 'Register success',
          text2: 'Please login to continue',
        });
        navigation.goBack();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: 'Email already in use',
            text2: 'Please use another email',
          });
        }

        if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Email invalid',
            text2: 'Please use another email',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppBar
        title={'Register'}
        backButton={true}
        color={'white'}
        textColor={'black'}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          marginTop: 35,
          marginHorizontal: 20,
        }}>
        <AForm
          name={'name'}
          modeInput="name"
          returnKeyType="next"
          control={control}
          focus={() => {
            setFocus('email');
          }}
        />
        <AForm
          name={'email'}
          modeInput="email"
          returnKeyType="next"
          control={control}
          focus={() => {
            setFocus('password');
          }}
        />
        <AForm
          name={'password'}
          returnKeyType="next"
          control={control}
          focus={() => {
            setFocus('currentPassword');
          }}
        />
        <AForm
          name={'currentPassword'}
          returnKeyType="done"
          control={control}
        />
        <Gap height={14} />
        <AButton
          label={loading ? 'Proses' : 'Register'}
          onPress={handleSubmit(handleRegister)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
