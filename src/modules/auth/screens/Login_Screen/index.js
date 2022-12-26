import React, { useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { View, TouchableHighlight, Keyboard, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { AForm, AButton } from '../../components';
import auth from '@react-native-firebase/auth';
import { useForm } from 'react-hook-form';
import { initialValues, schemeLogin } from '../../utils';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const methods = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schemeLogin),
  });

  const { control, handleSubmit, setFocus } = methods;

  const handleLogin = value => {
    setLoading(true);
    dismissKeyboard();
    auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Login success',
          text2: 'Welcome to Paradise',
        });
        navigation.dispatch(StackActions.replace('Home'));
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Toast.show({
            type: 'error',
            text1: 'User not found',
            text2: 'Please check your email and password',
          });
        }
        if (error.code === 'auth/wrong-password') {
          Toast.show({
            type: 'error',
            text1: 'Wrong password',
            text2: 'Please check your email and password',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 20,
          }}>
          <View style={{ alignItems: 'center', marginBottom: 36 }}>
            <Text style={{ fontSize: 28, fontWeight: '700' }}>
              Welcome to Paradise
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>
              Silahkan login terlebih dahulu
            </Text>
          </View>
          <AForm
            name="email"
            returnKeyType="next"
            control={control}
            focus={() => {
              setFocus('password');
            }}
          />
          <AForm name="password" returnKeyType="done" control={control} />

          <AButton
            label={loading ? 'Redirecting' : 'Masuk'}
            onPress={handleSubmit(handleLogin)}
            disabled={loading}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Belum punya akun?
            </Text>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="transparent"
              onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: 'blue', fontSize: 15, fontWeight: '700' }}>
                Daftar Sekarang
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
