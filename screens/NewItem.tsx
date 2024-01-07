import { reference } from "../utils/firebase/database_reference";
import auth from "@react-native-firebase/auth"
import { Place } from "../components/places/models/place.model";
import PlacesForm from "../components/places/PlacesForm";

export default function NewItem(this: any, { navigation }: any) {

  const addHandler = (place: Place) => {
    try {
      const ref = reference.ref(`users/${auth().currentUser?.uid}`);
      ref.child('places').once('value', snapshot => { 
        const id = (Math.random() * Date.now()).toFixed(0);

        if (snapshot.val() === false) {
          ref.child('places').set({ 0: 
            {
              key: id,
              title: place.title,
              description: place.description,
              address: place.address,
              imageUri: place.imageUri,
              location: {
                lat: place.location.lat,
                lon: place.location.lon
              }
            }
          }).then(() => navigation.navigate("List"));
        } else if (snapshot.val() instanceof Array) {
          // const newIndex = snapshot.val().length;
          const list = [
            ...snapshot.val(), 
            {
              key: id,
              title: place.title,
              description: place.description,
              address: place.address,
              imageUri: place.imageUri,
              location: {
                lat: place.location.lat,
                lon: place.location.lon
              }
            }
          ]

          ref.set({ places: list }).then(() => navigation.navigate("List"));
        }  
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <PlacesForm isEdit={false} placeKey={null} onSubmit={addHandler}/>
  )
}