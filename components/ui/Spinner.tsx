import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

interface SpinnerProps {
  message: string,
  size?: 'large' | 'small',
  color?: string
}

export default function Spinner({ message, size = 'large', color = Colors.WHITE }: SpinnerProps) {
  return (
    <View style={styles.spinnerContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size={size} color={color}/>
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});