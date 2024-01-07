import { useEffect, useState } from "react"
import { Alert, View, Text, Image, StyleSheet } from "react-native";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/colors";
import { useForegroundPermissions, PermissionStatus, getCurrentPositionAsync, Accuracy } from "expo-location";
import { getMapPreview } from "../../utils/location/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackParams } from "../../App";

interface ImagePickerProps {
  onLocationPickHandler: (location: { lat: string, lon: string }) => void,
  isInvalid?: boolean,
  label?: string,
  presetLocation?: { lat: string, lon: string }
}

export default function LocationPicker({ onLocationPickHandler, isInvalid, label, presetLocation }: ImagePickerProps) {
  const [pickedLocation, setPickedLocation] = useState<{lat: string, lon: string} | null>(null);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation<NativeStackNavigationProp<NativeStackParams>>();
  const route = useRoute<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.lat,
        lon: route.params.lon,
      };
      setPickedLocation(mapPickedLocation);
      onLocationPickHandler(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    if (presetLocation) {
      setPickedLocation(presetLocation);
    }
  }, [presetLocation]);

  // useEffect(() => {
  //   async function handleLocation() {
  //     if (pickedLocation) {
  //       // const address = await getAddress(
  //       //   pickedLocation.lat,
  //       //   pickedLocation.lon
  //       // );
  //       onLocationPickHandler({ ...pickedLocation });
  //     }
  //   }

  //   handleLocation();
  // }, [pickedLocation, onLocationPickHandler]);

  async function verifyPermissions() {
    if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Location needs permission',
        'This application needs access to your location to continue using it.'
      );
      return false;
    }

    return true;
  }

  async function pickLocationHandler() {
    const hasPermissions = verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: Accuracy.Highest,
      timeInterval: 1000
    });
    setPickedLocation({
      lat: location.coords.latitude.toString(),
      lon: location.coords.longitude.toString()
    });
    onLocationPickHandler({
      lat: location.coords.latitude.toString(),
      lon: location.coords.longitude.toString()
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  return (
    <View>
      {label && <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>}
      <View style={[styles.imagePreview, isInvalid && styles.imagePreviewInvalid]}>
        {pickedLocation ? 
          <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lon) }}></Image> :
          <Text style={styles.noImage}>No location to display</Text>
        }
      </View>
      <View style={styles.buttonsGroup}>
        <IconButton 
          type="location" 
          onPress={pickLocationHandler} 
          title="Locate"
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
        ></IconButton>
        <IconButton 
          type="map" 
          onPress={pickOnMapHandler} 
          title="Pick on Map"
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
        ></IconButton>
      </View>
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
  buttonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})