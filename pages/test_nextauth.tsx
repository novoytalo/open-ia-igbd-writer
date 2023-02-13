//Nextauth for now out off project

// import { useSession, signIn, signOut } from "next-auth/react";
// export default function Component() {
//     const { data: session } = useSession();
//     if (session) {
//         console.log("user inf: ", session);
//         return (
//             <>
//                 Signed in as {session.user?.email} <br />
//                 <button onClick={() => signOut()}>Sign out</button>
//             </>
//         );
//     }
//     return (
//         <>
//             Not signed in <br />
//             <button onClick={() => signIn()}>Sign in</button>
//         </>
//     );
// }
// import { getAuth } from "firebase-admin/auth";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { db } from "../services/firebase";
import Nextauth from "./api/auth/[...nextauth]";
import { authOptions } from "./api/auth/[...nextauth]";
export default function Component() {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {}, [session]);
    if (session) {
        return (
            <>
                <div>Status: {status}</div>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
                <button
                    onClick={() => {
                        router.push("/redirect_pag_ex");
                        console.log("clicked!");
                    }}
                >
                    RedirectPg
                </button>
            </>
        );
    }
    if (status === "loading") {
        return <p>Loading...</p>;
    }
    async function handleGithubSigninGitHub() {
        await signIn("github", {
            callbackUrl: "http://localhost:3000",
        });
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
            <button onClick={handleGithubSigninGitHub}>Sign in GitHub</button>
            <main>
                <div>Status: {status}</div>
                {/* {status === "unauthenticated" ? (
                    <div>Not authenticated</div>
                ) : (
                    <div>authenticated</div>
                )} */}
            </main>
        </>
    );

    // const auth = getAuth();

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/firebase.User
    //         console.log("user");
    //         console.log(user);
    //         // ...
    //     } else {
    //         console.log("no user");
    //         // User is signed out
    //         // ...
    //     }
    // });
}

// export async function getServerSideProps(context: any) {
//     const session = await getServerSession(
//         context.req,
//         context.res,
//         authOptions
//     );

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: {
//             session,
//         },
//     };
// }
