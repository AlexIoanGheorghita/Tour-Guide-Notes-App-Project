import { View, FlatList, Text } from "react-native";
import ListItem from "../components/list/ListItem";
import { useEffect, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/colors";
import { reference } from "../utils/firebase/database_reference";
import auth from "@react-native-firebase/auth"

// const items: {[key: string]: string}[] = [
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "The Actual Romanian Atheneum",
//     address: "Calea Victoriei, Blvd Dacia, si Magheru"
//   },
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "Romanian Atheneum",
//     address: "Calea Victorie"
//   },
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "Romanian Atheneum",
//     address: "Calea Victorie"
//   },
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "Romanian Atheneum",
//     address: "Calea Victorie"
//   },
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "Romanian Atheneum",
//     address: "Calea Victorie"
//   },
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "Romanian Atheneum",
//     address: "Calea Victorie"
//   },
//   {
//     imagePath: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/0c/a7/f3/bucharest.jpg?w=1200&h=1200&s=1",
//     placeName: "Romanian Atheneum",
//     address: "Calea Victorie"
//   },
// ]

export default function List(this: any, {navigation}: any) {
  const [places, setPlaces] = useState<{[key: string]: any}[]>([]);

  useEffect(() => {
    const ref = reference.ref(`users/${auth().currentUser?.uid}/places`);
    const listener = ref.on('value', (snapshot: any) => {
      if (snapshot.val() === false) {
        setPlaces([]);
      } else if (snapshot.val() instanceof Array) {
        setPlaces(snapshot.val());
      }
    });
    return () => ref.off('value', listener);
  }, [reference]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <IconButton 
          color={Colors.WHITE} 
          size={32} 
          type={"add"}
          onPress={onIconPressHandler}
        ></IconButton>}
      })
  }, [navigation])

  function onIconPressHandler() {
    navigation.navigate("NewItem");
  }

  function onItemPressHandler(data: {[key: string]: any}) {
    navigation.navigate("ItemDetails", { ...data });
  }

  return(
    <View>
      {places.length > 0 ? 
        <FlatList 
        data={places}
        renderItem={(currentData) => 
          <ListItem 
            onPress={onItemPressHandler.bind(this, currentData.item)}
            imagePath={currentData.item.imageUri}
            address={currentData.item.address}
            placeName={currentData.item.title}
          />}
        /> :
        <Text>No places added yet</Text>
      }
    </View>
  )
}