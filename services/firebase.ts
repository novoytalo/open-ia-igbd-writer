// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getDatabase} from "@firebase/database";
import {getStorage} from 'firebase/storage'
import data from 'firebase/database';
import 'firebase/database'
import { connectAuthEmulator, getAuth, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

function valueProcess(){
  console.log(' process env value!: ',process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);
}

// if(!firebase.getApp.length){
//   firebase.initializeApp(firebaseConfig)
// }else{
//   firebase.getApp()
// }

// const database=firebase.database()



// Initialize Firebase

// const app = getApps.length >0? getApp(): initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db =getFirestore(app);
const storage = getStorage(app);
const trueDB= getDatabase(app);
const auth = getAuth(app);
//emulator
//this emulator need to be iniciate with a comand on terminal,
//after this need to create user and configs using the
//generad, just like a firebase online (//http://localhost:4000), but emulated on the bowser,
//just like keyclock, but on port 4000.
//all this to test locally the app and don't need keys secrets
//if chouse email and password, best is create a rotine to verify 
//owner of this email and it can be done with firebase admin
//Or use OAuth2 provides that firebase supports
// connectAuthEmulator(auth,"http://localhost:9099");


//creat a coletion
// const userCredential = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
// const todosCol= collection(db,'todos')
// const snapshot = await getDocs(todosCol)
//detect auth state
// onAuthStateChanged(auth, user=>{
//   if(user!==null){
//     console.log('logged in!');
//     console.log(user);
    
//   } else {
//     console.log('No user');
//   }
// })

// const logout = await signOut(auth);
/////////////////////////////////////////////////////
///comunication whit api using tokens 

//get the id token in the browser
// const idToken= await getIdToken(auth.currentUser);
// const response= await fetch (getCookieUrl,{
//   headers: new Headers({
//     'Authorization':`Bearer ${idToken}`
//   })
// });

//Verify the id token on the server (Api)
// const cookie = await adminAuth.createSessionCookie(idToken);
// response.cookie('__session', cookie, options)

// /// validate a cookie on the server
// const cookies = cookie.parse (req.headers.cookie);
// const {__session}=cookies;
// const {uid}= await adminAuth.verifySessionCookie(__session);
/////////////////////////////////////////////////////

export { db, trueDB, firebase, valueProcess,app, auth, storage}
// export default firebase