import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const DialogAlert = ({ title, subTitle, visible, setVisible, callback }) => {
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Portal>
        <Dialog
          style={{ backgroundColor: 'white' }}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ fontSize: 16 }}>{subTitle}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={callback}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogAlert;
