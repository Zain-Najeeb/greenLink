export interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    error?: string;
  }
  
  export interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'link';
    style?: object;
    disabled?: boolean;
    loading?: boolean;
  }