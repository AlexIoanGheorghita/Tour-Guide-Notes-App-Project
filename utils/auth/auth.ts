import auth, { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import { reference } from "../firebase/database_reference";
 
// async function authenticate(type: string, email: string, password: string) {
//   try {
//     const response = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${API_KEY}`,
//       {
//         email: email,
//         password: password,
//         returnSecureToken: true
//       }
//     )

//     console.log(response);
//     return response.data.idToken;

//   } catch (err) {
//     throw new Error("Request failed");
//   }
// }

export async function signUp(email: string, password: string) {
  try {
    const response: FirebaseAuthTypes.UserCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    if (response.user) {
      console.log(response.user.uid);
      reference.ref(`users/${response.user.uid}`).set({ places: false }).then(() => console.log("Places set!"));
      return response.user.getIdToken();
    }

  } catch (err) {
    console.log(err);
    throw new Error("Request failed");
  }

  // return authenticate('signUp', email, password);
}

export async function login(email: string, password: string) {
  try {
    const response: FirebaseAuthTypes.UserCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );

    if (response.user) {
      return response.user.getIdToken();
    }

  } catch (err) {
    console.log(err);
    throw new Error("Request failed");
  }
}