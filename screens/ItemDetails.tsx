import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { getMapPreview } from "../utils/location/location";
import { useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { useRoute } from "@react-navigation/native";
import { reference } from "../utils/firebase/database_reference";
import auth from "@react-native-firebase/auth"

export default function ItemDetails({ navigation }: any) {
  const route = useRoute<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: any) => {
        return (
          <>
            <IconButton 
              color={tintColor} 
              size={32} 
              type={"create-outline"}
              onPress={onIconEditHandler}
            ></IconButton>
            <IconButton 
              color={Colors.RED} 
              size={32} 
              type={"trash-outline"}
              onPress={onIconDeleteHandler}
            ></IconButton>
          </>
          )
        },
      headerTitleAlign: 'left'
      })
  }, [navigation])

  function onIconEditHandler() {
    console.log(route.params);
    navigation.navigate("UpdateItem", { key: route.params.key });
  }

  function onIconDeleteHandler() {
    console.log(route.params);

    try {
      const ref = reference.ref(`users/${auth().currentUser?.uid}`);
      ref.child('places').once('value', snapshot => { 
        if (snapshot.val().length === 1) {
          ref.set({ places: false }).then(() => navigation.navigate("List"));
        } else if (snapshot.val().length > 1) {
          const filteredList = snapshot.val().filter((place: any) => {
            return place.key !== route.params.key;
          });
          console.log(filteredList);

          ref.set({ places: filteredList }).then(() => navigation.navigate("List"));
        }  
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: route.params.imageUri }}></Image>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{route.params.title}</Text>
        <Text style={styles.bodyText}>{route.params.description}</Text>
        <View style={styles.addressContainer}>
          <Text style={[styles.bodyText, { fontWeight: "800" }]}>Address:</Text>
          <Text style={styles.bodyText}>{" " + route.params.address}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image style={styles.image} source={{ uri: getMapPreview(route.params.location.lat, route.params.location.lon) }}></Image>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  bodyContainer: {
    margin: 16
  },
  title: {
    fontSize: 24,
    color: Colors.WHITE,
    marginVertical: 16
  },
  bodyText: {
    fontSize: 18,
    color: Colors.WHITE,
    marginVertical: 16
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  locationContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
})