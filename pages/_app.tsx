import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { SessionProvider, useSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import AuthProvider from "../services/auth";
import { Provider } from "react-redux";
import store from "../store";
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </AuthProvider>
    );
}

// export default function App({ Component, pageProps }: AppProps) {
//     export default function App( Component, pageProps ) {
//     return (
//         // <SessionProvider session={pageProps.session}>
//             <Component {...pageProps} />
//        //  </SessionProvider>
//     );
// }
// import type { NextComponentType } from "next"; //Import Component type

// //Add custom appProp type then use union to add it
// type CustomAppProps = AppProps & {
//     Component: NextComponentType & { auth?: boolean }; // add auth type
// };

// export default function App({
//     Component,
//     pageProps: { session, ...pageProps },
// }: CustomAppProps) {
//     return (
//         <SessionProvider
//             // session={pageProps.session}
//             session={session}
//             // Re-fetch session every 5 minutes
//             refetchInterval={5 * 60}
//             // Re-fetches session when window is focused
//             refetchOnWindowFocus={true}
//         >
//             {Component.auth ? (
//                 <Auth>
//                     <Component {...pageProps} />
//                 </Auth>
//             ) : (
//                 <Component {...pageProps} />
//             )}
//         </SessionProvider>
//     );
// }

// function Auth({ children }: any) {
//     // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//     const { status } = useSession({ required: true });

//     if (status === "loading") {
//         return <div>Loading...</div>;
//     }

//     return children;
// }

// export async function getServerSideProps({ req, res }: any) {
//     return {
//         props: {
//             session: await getServerSession(req, res, authOptions),
//         },
//     };
// }
