import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBF7KzC8HhtFHHGKimwhnQ5wbyOPEh-Wo",
  authDomain: "crown-clothing-db-1c531.firebaseapp.com",
  projectId: "crown-clothing-db-1c531",
  storageBucket: "crown-clothing-db-1c531.appspot.com",
  messagingSenderId: "467672080011",
  appId: "1:467672080011:web:98f585f3c36584db93be8e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if (userAuth) {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date()
      try {
        await setDoc(userDocRef, {
          displayName, email, createdAt, ...additionalInformation,
        })
      } catch(error){
        console.log("Error creating the user", error.message)
      }
    }
    return userDocRef;
  };
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return ;
  return await createUserWithEmailAndPassword(auth, email, password);
} 
