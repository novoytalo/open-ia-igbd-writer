import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { UserContext } from "../services/auth";
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    UserCredential,
} from "firebase/auth";
import {
    doc,
    setDoc,
    getDoc,
    Timestamp,
    onSnapshot,
    addDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

import { app, auth, db, storage } from "./../services/firebase";

import { async } from "@firebase/util";
export default function Newtestauth() {
    //take context
    const {
        isOpen,
        setIsOpen,
        userInfo,
        setUserInfo,
        passCookie,
        setPassCookie,
    } = useContext(UserContext);
    // const [tokeTest, setTokeTest] = useState<any>();
    function singInPoopUp() {
        const provider = new GoogleAuthProvider();
        //see https://developers.google.com/identity/protocols/oauth2/scopes?hl=pt-br
        //to get addScope and choises by Google
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                setPassCookie(token);
                // setTokeTest(token);
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // setTokeTest(user);
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    function signInOnPage() {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        // const auth = getAuth();

        auth.languageCode = "pt";
        signInWithRedirect(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credential(result);
                const token = credential?.accessToken;
                // setTokeTest(token);
                setPassCookie(token);
            })
            .catch((error) => {
                console.log(error);
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
        // firebase.auth().useDeviceLanguage();
        // this.provider.setCustomParameters({
        //     login_hint: "user@example.com",
        // });

        //   const auth = getAuth();
    }
    async function getUserInformation() {
        // // const auth = getAuth();
        // getRedirectResult(auth)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access Google APIs.
        //         console.log("result from frontend: ", result);
        //         if (result !== null) {
        //             const credential =
        //                 GoogleAuthProvider.credentialFromResult(result);
        //             const token = credential?.accessToken;

        //             // The signed-in user info.
        //             const user = result?.user;
        //             console.log(result);
        //         }
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential =
        //             GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });
        // const auth = getAuth();
        const provider = new GoogleAuthProvider();
        // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        const auth = getAuth();
        // signInWithRedirect(auth, provider);
        await signInWithRedirect(auth, provider);
        await getRedirectResult(auth)
            .then((result: any) => {
                console.log("entrou0");
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;

                // The signed-in user info.
                const user = result.user;
                console.log("entrou1");
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log("error", credential);
                console.log("entrou2");
            });
        console.log("entrou3");
    }
    function outAuth() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    }

    async function writeSalveAiText_user() {
        //for now just use a fake id and Ia genarade text to test
        const id_igdb_game = 16;
        const text_Ia =
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

        const docData = {
            //id from
            idReferenceIgbdApiGame: id_igdb_game,
            textCreateByOpenIA: [text_Ia],
            // numberExample: 3.14159265,
            dateExample: Timestamp.fromDate(new Date()),
            email: userInfo?.email,
            displayName: userInfo?.displayName,
            uid: userInfo?.uid,
            photoURL: userInfo?.photoURL,

            // arrayExample: [5, true, "hello"],
            // nullExample: null,
            // objectExample: {
            //     a: 5,
            //     b: {
            //         nested: "foo",
            //     },
            // },
        };

        // await setDoc(doc(db, "data", "two"), docData);

        await setDoc(doc(db, "data", `${id_igdb_game}`), docData);
        //In this case is autogenarated a id
        // const dataRef = doc(collection(db, "data"));
        // await setDoc(dataRef, docData);
    }
    async function getWriteSalveAiText_user() {
        const docRef = doc(db, "data", "one");

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    async function realTime() {
        //change "one" to id
        const unsub = onSnapshot(doc(db, "data", "one"), (doc) => {
            console.log("Current data: ", doc.data());
        });
    }

    async function queryOnDatabase() {
        // Create a reference to the data collection

        const dataRef = collection(db, "data");

        // Create a query against the collection.
        const q = query(dataRef, where("uid", "==", userInfo?.uid));
        // console.log(q);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }
    return (
        <>
            <div>User:</div>
            {/* <div>
                Token:{" "}
                {passCookie!!! !== undefined
                    ? passCookie!!!
                    : "Token is undefined"}
            </div> */}
            <div>{userInfo?.displayName}</div>
            <div>{userInfo?.email}</div>
            <div>{userInfo?.emailVerified}</div>
            <div>{userInfo?.photoURL}</div>
            <div>{userInfo?.uid}</div>

            <div>newtestauth</div>
            <button onClick={singInPoopUp}>SingIn</button>
            <button onClick={signInOnPage}>SingIn</button>
            <button onClick={getUserInformation}>Getinformation</button>
            <button onClick={outAuth}>SingOut</button>
            <button onClick={writeSalveAiText_user}>
                writeSalveAiText_user
            </button>
            <button onClick={getWriteSalveAiText_user}>
                getWriteSalveAiText_user
            </button>
            <button onClick={realTime}>realTime</button>
            <button onClick={queryOnDatabase}>queryOnDatabase</button>
            {/* <div>Show token: {tokeTest}</div> */}
        </>
    );
}
