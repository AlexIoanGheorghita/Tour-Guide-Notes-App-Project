import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import ImagePicker from "../places/ImagePicker";
import { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "./models/place.model";
import { reference } from "../../utils/firebase/database_reference";
import auth from "@react-native-firebase/auth";

interface PlacesFormProps {
  isEdit: boolean,
  placeKey: number | null,
  onSubmit: (place: Place) => void
}

export default function PlacesForm(this: any, { isEdit, placeKey, onSubmit }: PlacesFormProps) {
  const [placeDetails, setPlaceDetails] = useState<Place>({
    key: 0,
    title: '',
    description: '',
    address: '',
    imageUri: '',
    location: {
      lat: '',
      lon: ''
    }
  });
  
  const [fieldsValidity, setFieldsValidity] = useState<{[key: string]: boolean}>({
    titleIsInvalid: false,
    descriptionIsInvalid: false,
    addressIsInvalid: false,
    imageUriIsInvalid: false,
    locationIsInvalid: false
  });

  useEffect(() => {
    if (isEdit && placeKey) {
      console.log("This is the edit page");
      const ref = reference.ref(`users/${auth().currentUser?.uid}/places`);
      ref.once('value', (snapshot: any) => {
        console.log(snapshot.val());
        const place = snapshot.val().find((item: Place) => Number(item.key) === placeKey);
        setPlaceDetails(place);
      });
    }
  }, [reference, isEdit, placeKey]);

  const updateInputFieldValue = (inputFieldName: string, enteredValue: string | {lat: string, lon: string}) => {
    setPlaceDetails({...placeDetails, [inputFieldName]: enteredValue});
  }

  function submitHandler() {
    const title = placeDetails.title.trim();
    const description = placeDetails.description.trim();
    const address = placeDetails.address.trim();

    console.log(placeDetails);

    if (
      !title ||
      !description ||
      !address ||
      !placeDetails.imageUri ||
      !placeDetails.location.lat || 
      !placeDetails.location.lon
    ) {
      Alert.alert('Invalid input', 'Please check the values you entered.');
      setFieldsValidity({
        titleIsInvalid: !title,
        descriptionIsInvalid: !description,
        addressIsInvalid: !address,
        imageUriIsInvalid: !placeDetails.imageUri,
        locationIsInvalid: !placeDetails.location.lat && !placeDetails.location.lon
      });
      return;
    }

    onSubmit(placeDetails);
  }

  return (
    <ScrollView style={styles.form}>
      <InputField
        label="Place Name"
        onUpdateValue={updateInputFieldValue.bind(this, 'title')}
        value={placeDetails.title}
        isInvalid={fieldsValidity.titleIsInvalid}
      />
      <InputField
        label="Place Description"
        onUpdateValue={updateInputFieldValue.bind(this, 'description')}
        value={placeDetails.description}
        isInvalid={fieldsValidity.descriptionIsInvalid}
      />
      <InputField
        label="Place Address"
        onUpdateValue={updateInputFieldValue.bind(this, 'address')}
        value={placeDetails.address}
        isInvalid={fieldsValidity.addressIsInvalid}
      />
      <ImagePicker 
        label="Place Photo"
        onImagePickHandler={updateInputFieldValue.bind(this, 'imageUri')}
        imagePath={isEdit ? placeDetails.imageUri : undefined}
        isInvalid={fieldsValidity.imageUriIsInvalid}
      ></ImagePicker>
      <LocationPicker
        label="Place Location"
        onLocationPickHandler={updateInputFieldValue.bind(this, 'location')}
        presetLocation={isEdit ? placeDetails.location : undefined}
        isInvalid={fieldsValidity.locationIsInvalid}
      ></LocationPicker>
      <Button onPress={submitHandler}>
        {isEdit ? "Edit Place" : "Add Place"}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
    flex: 1
  }
})