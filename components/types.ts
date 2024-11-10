export interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  error?: string;
}

export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "link";
  style?: object;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface FormLayoutProps {
  children: React.ReactNode;
}

export interface CustomSnackbarProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: object; 
}

export interface SelectRouteProps {}
