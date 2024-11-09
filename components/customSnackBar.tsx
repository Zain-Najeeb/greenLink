// customSnackBar.tsx
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { CustomSnackbarProps } from './types';

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  visible,
  message,
  onDismiss,
  actionLabel = 'Undo',
  onActionPress,
}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: actionLabel,
        onPress: onActionPress || (() => {}), // Defaults to no-op if onActionPress isn't provided
      }}
      style={styles.snackbar}
      theme={{ colors: { accent: '#FFFFFF' } }} // Sets action button color to white
    >
      {message}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    left: 21,
    right: 25,
    backgroundColor: 'black', 
	marginTop: 30,
	marginBottom: 10,
  },
});

export default CustomSnackbar;