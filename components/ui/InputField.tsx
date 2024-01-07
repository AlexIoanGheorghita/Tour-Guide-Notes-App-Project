import { View, Text, TextInput, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"

interface InputFieldProps {
  label: string,
  keyboardType?: 'email-address' | 'numeric' | 'default' | 'number-pad' | 'decimal-pad',
  secure?: boolean,
  onUpdateValue: (...args: any) => void,
  value: any,
  isInvalid: boolean
}


export default function InputField({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid
}: InputFieldProps) {
  return (
    <View style={styles.formField}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <TextInput 
        style={[styles.input, isInvalid && styles.inputInvalid]} 
        autoCapitalize="none"
        secureTextEntry={secure}
        keyboardType={keyboardType}
        onChangeText={onUpdateValue}
        value={value}
      ></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  formField: {
    marginVertical: 12
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.WHITE
  },
  labelInvalid: {
    color: Colors.RED
  },
  input: {
    backgroundColor: Colors.BLUE,
    fontSize: 16,
    padding: 6,
    borderRadius: 6
  },
  inputInvalid: {
    backgroundColor: Colors.RED
  }
})