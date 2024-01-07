import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import { Colors } from "../../constants/colors";

export interface ListItemProps {
  imagePath: string,
  placeName: string,
  address: string,
  onPress: () => void
}

export default function ListItem({ imagePath, placeName, address, onPress }: ListItemProps) {
  const title = placeName.length > 23 ? placeName.slice(0, 24) + "..." : placeName;
  const subtitle = address.length > 35 ? address.slice(0, 36) + "..." : address;

  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      <Image source={{ uri: imagePath }} style={styles.imageStyle}></Image>
      <View style={styles.textContainer}>
        <Text style={styles.placeTitle}>{title}</Text>
        <Text style={styles.placeAddress}>{subtitle}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    height: 80,
    marginVertical: 16,
    marginHorizontal: 24,
    backgroundColor: Colors.PENN_BLUE,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  imageStyle: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-evenly'
  },
  placeTitle: {
    fontSize: 18,
    color: Colors.WHITE
  },
  placeAddress: {
    fontSize: 14,
    color: Colors.WHITE,
    opacity: 0.7
  }
});