import React, { Children } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import { FormLayoutProps } from "./types";

const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView>
          <View style={styles.formContainer}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  formContainer: {
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    padding: 16,
    flexGrow: 1,
  },
});

export default FormLayout;
