import Card from "./components/CardComp";
import style from "../styles/Card.module.css";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    getDatabase,
    push,
    ref,
    set,
    onValue,
    get,
    child,
} from "firebase/database";
// import { dbFireBase, firebase, valueProcess } from "../services/firebase";
import { auth, trueDB, valueProcess } from "../services/firebase";
import { Database } from "firebase/database";
import dataBaseFireBase from "firebase/database";
import { event } from "jquery";
import { useState } from "react";

export default function TestPage() {
    // function writeUserData(userId: number, textOpenIA: string) {

    //     const db = trueDB;
    //     set(ref(db, "textIA" + userId), {
    //         text: textOpenIA,
    //     });
    // }
    //////////////////////////////////////////////
    function writeUserData(
        userId: number,
        name: string,
        email: string,
        imageUrl: string
    ) {
        // const db = trueDB;
        set(ref(trueDB, "users/" + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl,
        });
    }
    //////////////////////////////////////

    // const starCountRef = ref(trueDB, "posts/" + postId + "/starCount");
    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     updateStarCount(postElement, data);
    // });

    ////////////////////////////////

    // const dbRef = ref(getDatabase());

    function readData(userId: number) {
        const dbRef = ref(trueDB);
        get(child(dbRef, `users/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //////////////////////////////////////////////

    function createUser(email: string, password: string) {
        // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log("my error", error);
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    ///////////////////////////////////////////////////////////
    //sing in
    function singIn(email: string, password: string) {
        // const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("user: ", user);
                // ...
            })
            .catch((error) => {
                console.log("login error: ", error);
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    ////////////////////////////////////////
    function singOutFronFireBase() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                console.log("on SigOut", error);
            });
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <div className={`${style.scronableCards}`}>
                <Card></Card>
            </div>

            <button
                onClick={() =>
                    writeUserData(
                        7,
                        "Renataaa",
                        "yahoo@renata",
                        "url da Renata Texto que vai aser editado"
                    )
                }
            >
                Test
            </button>

            <button onClick={valueProcess}>Env value?</button>
            <button onClick={() => readData(5)}>Ler data </button>

            <form
                style={{
                    // position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "red",
                    // top: "100px",
                    // left: "100px",
                    width: "30em",
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    createUser(email, password);
                    console.log(
                        "onsubmit values new user: " + password + " " + email
                    );
                }}
            >
                <input
                    onChange={(e) => {
                        console.log(e.target.value);
                        setEmail(e.target.value);
                    }}
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                />
                <input
                    type="password"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                    name="password"
                    value={password}
                />
                <button>Create New User</button>
            </form>
            <form
                style={{
                    // position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "red",
                    // top: "100px",
                    // left: "100px",
                    width: "30em",
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    singIn(email, password);
                    console.log(
                        "onsubmit values Login: " + password + " " + email
                    );
                }}
            >
                <input
                    onChange={(e) => {
                        console.log(e.target.value);
                        setEmail(e.target.value);
                    }}
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                />
                <input
                    type="password"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                    name="password"
                    value={password}
                />
                <button>LogIn</button>
            </form>

            <button onClick={singOutFronFireBase}>Sing Out</button>
        </>
    );
}
