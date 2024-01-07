import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import List from './screens/List';
import Map from './screens/Map';
import { useContext } from 'react';
import AuthContextProvider, { AuthContext } from './utils/context/AuthContextProvider';
import { Colors } from './constants/colors';
import NewItem from './screens/NewItem';
import ItemDetails from './screens/ItemDetails';
import IconButton from './components/ui/IconButton';
import UpdateItem from './screens/UpdateItem';

export type NativeStackParams = {
  Register: undefined,
  Login: undefined,
  List: undefined,
  NewItem: undefined,
  UpdateItem: undefined,
  ItemDetails: undefined,
  Map: undefined
}

const Stack = createNativeStackNavigator<NativeStackParams>();

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{
      contentStyle: {
        backgroundColor: Colors.DARK_BLUE
      }
    }}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  )
}

function ProtectedRoutes() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{
      headerRight: ({ tintColor }: any) => (
        <IconButton
          color={tintColor}
          size={32}
          type={"exit"}
          onPress={authContext.logout}
        ></IconButton>
      ),
      contentStyle: {
        backgroundColor: Colors.DARK_BLUE
      },
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen name="List" component={List}></Stack.Screen>
      <Stack.Screen name="NewItem" component={NewItem} options={{title: "Add New"}}></Stack.Screen>
      <Stack.Screen name="UpdateItem" component={UpdateItem} options={{title: "Edit Place"}}></Stack.Screen>
      <Stack.Screen name="ItemDetails" component={ItemDetails} options={{title: "Place Details"}}></Stack.Screen>
      <Stack.Screen name="Map" component={Map}></Stack.Screen>
    </Stack.Navigator>
  )
}

function Root() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <StatusBar style='light'/>
      <NavigationContainer>
        {authContext.isAuthenticated ? <ProtectedRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </>
  );
}


export default function App() {

  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
