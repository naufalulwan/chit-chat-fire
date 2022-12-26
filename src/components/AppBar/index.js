import React from 'react';
import { StatusBar } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

const AppBar = ({ title, color, textColor, backButton, onPress }) => {
  const theme = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={color ?? theme.colors.primary}
        barStyle={color ? 'dark-content' : 'light-content'}
      />
      <Appbar.Header style={{ backgroundColor: color ?? theme.colors.primary }}>
        {backButton ? (
          <Appbar.BackAction
            onPress={onPress}
            color={textColor ?? theme.colors.surface}
          />
        ) : null}

        <Appbar.Content
          title={title}
          titleStyle={{
            textAlign: 'center',
            color: textColor ?? theme.colors.surface,
          }}
          style={
            backButton
              ? {
                  marginLeft: 0,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  zIndex: -1,
                }
              : {}
          }
        />
      </Appbar.Header>
    </>
  );
};

export default AppBar;
