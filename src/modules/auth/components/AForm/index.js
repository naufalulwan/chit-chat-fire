import { ErrorMessage } from '@hookform/error-message';
import React, { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const AForm = props => {
  const { returnKeyType, name, control, defaultValue, focus } = props;

  const { field, formState } = useController({
    name,
    control,
    defaultValue,
  });

  const [placeholder, setPlaceholder] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  useEffect(() => {
    if (field.name === 'name') {
      setPlaceholder('Masukan Nama Anda');
      setSecureTextEntry(false);
    } else if (field.name === 'email') {
      setPlaceholder('Masukan Email');
      setSecureTextEntry(false);
    } else if (field.name === 'password') {
      setPlaceholder('Masukan Password');
      setSecureTextEntry(true);
    } else if (field.name === 'currentPassword') {
      setPlaceholder('Konfirmasi Password');
      setSecureTextEntry(true);
    }
  }, [field.name]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(prev => !prev);
  };

  return (
    <View style={{ marginBottom: 18 }}>
      <TextInput
        ref={field.ref}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        keyboardAppearance="dark"
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        right={
          field.name !== 'email' && field.name !== 'name' ? (
            <TextInput.Icon
              icon={secureTextEntry ? 'eye' : 'eye-off'}
              onPress={toggleSecureEntry}
            />
          ) : null
        }
        onSubmitEditing={returnKeyType === 'next' ? focus : null}
      />
      <ErrorMessage
        errors={formState.errors}
        name={field.name}
        render={({ message }) => (
          <HelperText type="error" visible={!!message}>
            {message}
          </HelperText>
        )}
      />
    </View>
  );
};

export default AForm;
