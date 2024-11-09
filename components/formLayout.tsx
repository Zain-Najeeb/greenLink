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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView>
          <View style={styles.formContainer}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    flexGrow: 1,
  },
});

export default FormLayout;
