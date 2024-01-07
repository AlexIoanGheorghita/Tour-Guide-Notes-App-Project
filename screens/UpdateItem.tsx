import { useEffect, useState } from "react";
import { Place } from "../components/places/models/place.model";
import { reference } from "../utils/firebase/database_reference";
import auth from "@react-native-firebase/auth";
import PlacesForm from "../components/places/PlacesForm";
import { useIsFocused, useRoute } from "@react-navigation/native";

export default function UpdateItem({ navigation }: any) {
  const route = useRoute<any>();
  console.log("Properties: ");
  console.log(route.params);

  const updateHandler = (place: Place) => {
    try {
      const ref = reference.ref(`users/${auth().currentUser?.uid}`);
      ref.child('places').once('value', snapshot => { 
        const editedList = snapshot.val().map((item: any) => {
          if (item.key !== route.params.key) {
            return item;
          } else {
            return place;
          }
        });
        console.log("Edited List");
        console.log(editedList);

        ref.set({ places: editedList }).then(() => navigation.navigate("List")); 
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <PlacesForm isEdit={true} placeKey={Number(route.params.key)} onSubmit={updateHandler}/>
  )
}