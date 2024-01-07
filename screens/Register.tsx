import { View, StyleSheet, Alert } from "react-native";
import { Colors } from "../constants/colors";
import { useContext, useState } from "react";
import { signUp } from "../utils/auth/auth";
import { AuthContext } from "../utils/context/AuthContextProvider";
import Spinner from "../components/ui/Spinner";
import AuthForm from "../components/auth/AuthForm";

export default function Register() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const registerHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const token = await signUp(email, password);
      console.log(token);
      if (token) {
        authContext.authenticate(token);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Authentication failed", "Please verify your credentials or try again later.");
      setIsAuthenticating(false);
    }
  }

  return (
    <View style={styles.loginContainer}>
      {isAuthenticating ? <Spinner message="Logging you in..." /> : <AuthForm isLogin={false} onAuthenticate={registerHandler}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARK_BLUE
  }
})