import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackParams } from "../../App";

interface AuthFormProps {
  isLogin: boolean,
  onAuthenticate: (email: string, password: string) => {}
}

export default function AuthForm(this: any, { isLogin, onAuthenticate }: AuthFormProps) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    emailIsInvalid: false,
    passwordIsInvalid: false,
    passwordsDontMatch: false
  });
  const navigation = useNavigation<NativeStackNavigationProp<NativeStackParams>>();

  function switchAuthMode() {
    if (isLogin) {
      navigation.replace('Register');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler() {
    const email = formValues.email.trim();
    const password = formValues.password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === formValues.confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        emailIsInvalid: !emailIsValid,
        passwordIsInvalid: !passwordIsValid,
        passwordsDontMatch: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate(email, password);
  }

  const updateInputFieldValue = (inputFieldName: string, enteredValue: any) => {
    setFormValues({...formValues, [inputFieldName]: enteredValue});
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
      <InputField
        label="Email Address"
        onUpdateValue={updateInputFieldValue.bind(this, 'email')}
        value={formValues.email}
        keyboardType="email-address"
        isInvalid={credentialsInvalid.emailIsInvalid}
      />
      <InputField
        label="Password"
        onUpdateValue={updateInputFieldValue.bind(this, 'password')}
        secure
        value={formValues.password}
        isInvalid={credentialsInvalid.passwordIsInvalid}
      />
      {!isLogin && (
        <InputField
          label="Confirm Password"
          onUpdateValue={updateInputFieldValue.bind(
            this,
            'confirmPassword'
          )}
          secure
          value={formValues.confirmPassword}
          isInvalid={credentialsInvalid.passwordsDontMatch}
        />
      )}
      <Button onPress={submitHandler}>{isLogin ? 'Log In' : 'Sign Up'}</Button>
      <Text style={styles.signUpText}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
      <Button onPress={switchAuthMode}>{isLogin ? 'Sign Up' : 'Log In'}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARK_BLUE
  },
  formContainer: {
    backgroundColor: Colors.PENN_BLUE,
    padding: 20,
    width: 280
  },
  formTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.WHITE,
    marginBottom: 16,
    paddingBottom: 20,
    borderBottomColor: Colors.BLUE,
    borderBottomWidth: 2
  },
  formField: {
    marginVertical: 12
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.WHITE
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.WHITE,
    marginTop: 24,
    paddingTop: 20,
    borderTopColor: Colors.BLUE,
    borderTopWidth: 2
  },
  input: {
    backgroundColor: Colors.BLUE,
    fontSize: 16,
    padding: 6,
    borderRadius: 6
  }
})