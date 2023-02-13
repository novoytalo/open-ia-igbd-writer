import NextAuth from "next-auth"
import jwt from 'jsonwebtoken';
import { FirestoreAdapter, FirestoreAdapterOptions } from "@next-auth/firebase-adapter"
import GoogleProvider  from "next-auth/providers/google";
import axios from 'axios';
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email"
import Credentials from "next-auth/providers/credentials"
import CredentialsProvider from 'next-auth/providers/credentials';
import 'firebase/auth';
import { signInWithCustomToken, signInWithEmailAndPassword, } from "firebase/auth"
import { auth, db, trueDB } from "../../../services/firebase"
import * as fireStoreFunction from "firebase/firestore"
import { FirebaseOptions } from "firebase/app";
import { app } from "firebase-admin";
import { signIn } from "next-auth/react";
import adminAuth from "firebase-admin/auth";
import type { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from "next";
import { user } from "firebase-functions/v1/auth";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

// if(undefined===process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID){

// } 

// const firebaseConfig ={
  
// }

export const authOptions: NextAuthOptions = 
  //STOP the NEXAUTH have problems with firebase
  //Future project ??????????
  // your configs
  {
  
    // https://next-auth.js.org/providers
    // secret: process.env.SECRET,
    // secret: value,
    providers: [
      GoogleProvider({
        // clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID===undefined ? "":process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        // clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET===undefined? "":process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_ID===undefined ? '':process.env.NEXT_PUBLIC_GOOGLE_ID ,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET===undefined?'':process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        
      }),
      // GitHubProvider({
      //   clientId: process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_ID===undefined?'':process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_ID,
      //   clientSecret: process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_SECRET===undefined?'':process.env.NEXT_PUBLIC_GIT_HUB_CLIENT_SECRET,
  
      // }),
    
      
        
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'jane@doe.com'},
        password: {label: 'Password', type: 'password'},
        },
        async authorize(credentials) {
        const {data} = await axios.post(
        `http://localhost:3000/api/auth/local`,
        {
        identifier: credentials?.email,
        password: credentials?.password,
        }
        );
        console.log('here is the data from strapi', data);
        if (data) return data;
        else {
        console.log('caught error');
        return null;
        }
        },
        }),
        // ,
        // session: {
        // strategy: 'jwt',
        // },
        // secret: process.env.JWT_SECRET,
        // callbacks: {
        // async jwt({token, user, account, profile, isNewUser}) {
        // if (user) {
        // token.jwt = user.jwt;
        // token.id = user.user.id;
        // token.name = user.user.username;
        // token.email = user.user.email;
        // }
        // return token;
        // },
        // async session({session, token, user}) {
        // session.jwt = token.jwt;
        // session.id = token.id;
        // return session;
        // },
        // },

        // export default (req, res) => NextAuth(req, res, myOptions);
      
    ],
    // fireStoreFunction
    //for now the integration with firebase is not working, it need to 
    //turn off autentication off on the firebase site to read and write. 
    //a solution is change some instructions on "node_modules", but in't exported to 
    //Versel for exemple. It neet to be solve by the original suporters.
    //So to protect my data session i going to use nextAuth to auth the api and pages
    //but i need to conect to fire base whit the original auth from Firebase.
    //another solution is use a custom token
    // adapter: FirestoreAdapter(
    //   // db:db,
    //   {
    //     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    //     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    //     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    //     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    //     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    //     // ...db.app.options,...fireStoreFunction
        
    //     ...fireStoreFunction
      
    // }
    // ),
    
    

    // callbacks: {
    //   authorized({ req , token }) {
    //     if(token) return true // If there is a token, the user is authenticated
    //   }
      
    // },
  
    // session: {
    //   strategy: 'jwt',
    //   maxAge: 30 * 24 * 60 * 60 // 30 days
    // },
    // jwt: {
    //   async encode({ secret, token }) {
    //     return jwt.sign(token, secret)
    //   },
    //   async decode({ secret, token }) {
    //     return jwt.verify(token, secret)
    //   },
    // },






    // session: {
    //     strategy: 'jwt',
        
    //     },
    //     secret: process.env.JWT_SECRET,
    //     callbacks: {
    //     async jwt({token, user, account, profile, isNewUser}) {
    //     if (user) {
    //     token.jwt = user.jwt;
    //     token.id = user.user.id;
    //     token.name = user.user.username;
    //     token.email = user.user.email;
    //     }
    //     return token;
    //     },
    //     async session({session, token, user}) {
    //     session.jwt = token.jwt;
    //     session.id = token.id;
    //     return session;
    //     },
    //     },
  




    // callbacks: {
    //   async signIn({ user, account, profile, email, credentials }) {
    //     const isAllowedToSignIn = true
    //     console.log('usuario!: ',user,'email!: ',email,'credenciais!: ',credentials)
    //     if (isAllowedToSignIn) {
          
    //       return true
    //     } else {
    //       // Return false to display a default error message
    //       return false
    //       // Or you can return a URL to redirect to:
    //       // return '/unauthorized'
    //     }
    //   },

    //   async jwt({ token, user, account, profile, isNewUser }) {
    //     console.log('jwt token!: ', token,'user jwt!: ',user)
    //     return token
    //   }
    // },
    callbacks: {
      async jwt(token: any, user?: any) {
        if (user) {
          // `user` will be the return value of `authorize` if user first login.
          return user;
        } else {
          // after login, `token` is the decoded jwt from current session-token.
          return token;
        }
      }
    },
    // jwt: {
    //   secret: process.env.SECRET,
    //   // encryption: true,
    // },
    debug: true,
    // pages: {
    //   signIn: '/api/auth/signin',
    //   error: '/api/auth/error',
    // }
    // ...
  }




  // export default (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, authOptions);
export default NextAuth(authOptions);

