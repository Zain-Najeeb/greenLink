import React, { createContext, useContext, useState } from 'react';
import CustomSnackbar from '@/components/customSnackBar';

type SnackbarContextType = {
  showSnackbar: (message: string, actionLabel?: string, onActionPress?: () => void) => void;
  hideSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [actionLabel, setActionLabel] = useState<string | undefined>();
  const [onActionPress, setOnActionPress] = useState<(() => void) | undefined>();

  const showSnackbar = (
    message: string,
    actionLabel?: string,
    onActionPress?: () => void
  ) => {
	console.log("TEST"); 
    setMessage(message);
    setActionLabel(actionLabel);
    setOnActionPress(() => onActionPress);
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <CustomSnackbar
        visible={visible}
        message={message}
        onDismiss={hideSnackbar}
        actionLabel={actionLabel}
        onActionPress={onActionPress}
      />
    </SnackbarContext.Provider>
  );
};
