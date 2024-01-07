import { useEffect, useState } from "react"
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from "expo-image-picker"
import { Alert, View, Text, Image, StyleSheet } from "react-native";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/colors";

interface ImagePickerProps {
  onImagePickHandler: (imageUri: string) => void,
  isInvalid?: boolean,
  label?: string,
  imagePath?: string
}

export default function ImagePicker({ onImagePickHandler, isInvalid, label, imagePath }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (imagePath) {
      setPickedImage(imagePath);
    }
  }, [imagePath])

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Camera needs permission',
        'This application needs access to the camera to continue using it.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermissions = verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 0.7
    });

    setPickedImage(image.assets![0].uri);
    onImagePickHandler(image.assets![0].uri);
  }

  return (
    <View>
      {label && <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>}
      <View style={[styles.imagePreview, isInvalid && styles.imagePreviewInvalid]}>
        {pickedImage ? <Image style={styles.image} source={{ uri: pickedImage }}></Image> : 
          <Text style={styles.noImage}>No image to display</Text>
        }
      </View>
      <IconButton 
        type="camera" 
        onPress={takeImageHandler} 
        title="Take Image"
        size={32}
        color={Colors.WHITE}
        additionalStyles={{ 
          borderWidth: 4,
          borderColor: Colors.WHITE,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 12
        }}
      >
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  noImage: {
    color: Colors.RICH_BLACK
  },
  imagePreview: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  imagePreviewInvalid: {
    backgroundColor: Colors.RED
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.WHITE
  },
  labelInvalid: {
    color: Colors.RED
  },
})