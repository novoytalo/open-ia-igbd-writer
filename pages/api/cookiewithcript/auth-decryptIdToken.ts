import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from 'crypto-js'
import { auth } from "../../../services/firebase-admin";
import Tokens from "csrf";

///only one validation... put firebase auth admin or merge this to the origem call...

 const decryptIdToken =async (req:NextApiRequest, res:NextApiResponse) => {
    const tokenId= req.headers.authorization===undefined?'':req.headers.authorization
    const tokenIIId = tokenId && tokenId.split(' ')[1]

    const keyTestUndefined =
                process.env.NEXT_PUBLIC_MY_SECRET_KEY === undefined
                    ? ""
                    : process.env.NEXT_PUBLIC_MY_SECRET_KEY; 
                    // console.log('PublicKey api kkk antes?', tokenId)
    // const key = process.env.MY_SECRET_KEY?.toString()!;
    // console.log('tokenIIId',tokenIIId)
    const tokenIdDecrypt = CryptoJS.AES.decrypt(tokenIIId.toString(), keyTestUndefined).toString(CryptoJS.enc.Utf8); 
    // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // const tokenId=plaintext;
    // console.log('PublicKey api kk depois?', tokenIdDecrypt)
    return tokenIdDecrypt
}

export default decryptIdToken;