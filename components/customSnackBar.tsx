// customSnackBar.tsx
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
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
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: actionLabel,
          onPress: onActionPress || (() => {}), // Defaults to no-op if onActionPress isn't provided
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CustomSnackbar;
