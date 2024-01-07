import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

interface IconButtonProps {
  size: number,
  color: string,
  type: any,
  title?: string,
  additionalStyles?: {[key: string]: any}
  onPress: () => void
}

export default function IconButton({size, color, type, onPress, title, additionalStyles}: IconButtonProps) {
  return (
    <Pressable style={({pressed}) => [styles.button, additionalStyles, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons size={size} color={color} name={type}></Ionicons>{title && <Text style={styles.buttonText}>{title}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center'
  },
  pressed: {
    opacity: 0.7
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16
  }
})