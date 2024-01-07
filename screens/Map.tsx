import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import IconButton from "../components/ui/IconButton";

export default function Map({ navigation }: any) {
  const [pickedLocation, setPickedLocation] = useState<{lat: number, lon: number} | null>(null);

  const defaultRegion = {
    latitude: 44.439663,
    longitude: 26.096306,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const saveLocation = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert(
        'No location selected',
        'You have to pick a location in order to save it.'
      );
      return;
    }

    navigation.navigate("NewItem", {
      lat: pickedLocation.lat.toString(),
      lon: pickedLocation.lon.toString()
    });
  }, [navigation, pickedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: any) => (
        <IconButton 
          size={24} 
          color={tintColor} 
          type={"save"} 
          onPress={saveLocation}          
        />
      )
    })
  
  }, [navigation, saveLocation])

  function selectLocationHandler(event: MapPressEvent) {
    setPickedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lon: event.nativeEvent.coordinate.longitude
    });
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        onPress={selectLocationHandler}
        initialRegion={defaultRegion}
        style={styles.map}
      >
        {pickedLocation && (
          <Marker 
            title="Picked Location"
            coordinate={{
              latitude: pickedLocation.lat,
              longitude: pickedLocation.lon
            }}
          />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
})