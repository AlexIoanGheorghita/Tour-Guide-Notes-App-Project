import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface Props {
  children: String,
  onPress: () => void
}

export default function Button({children, onPress}: Props) {
  return (
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PEACH,
    borderRadius: 8,
    marginVertical: 8
  },
  pressed: {
    opacity: 0.7
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 12,
    fontWeight: 'bold',
    fontSize: 16
  }
})