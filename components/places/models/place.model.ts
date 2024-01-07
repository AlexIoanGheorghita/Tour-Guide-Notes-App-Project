export interface Place {
  key: number,
  title: string,
  description: string,
  address: string,
  imageUri: string,
  location: { lat: string, lon: string }
}