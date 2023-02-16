import axios from "axios";

import decryptIdToken from "../cookiewithcript/auth-decryptIdToken";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../services/firebase-admin";
import Tokens from "csrf";
export default async function handlerCsrfToken(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        
        
        const tokenIdDecrypt = await decryptIdToken(req, res);
        if (!tokenIdDecrypt) {
            return res.status(401).end("Not a valid user");
        }

        ////////////////////////////////
        
        const tokenId =
            req.headers.authorization === undefined
                ? ""
                : req.headers.authorization;
        const tokenIIId = tokenId && tokenId.split(" ")[1];

       
        ///////////////////////////////

        auth.verifyIdToken(tokenIdDecrypt)
            .then((decodedTokenFireBase) => {
                console.log("api user data decoded", decodedTokenFireBase);
                const uid = decodedTokenFireBase.uid;
                return uid;

                // ...
            })
            .catch((error) => {
                // Handle error
                res.status(401).end("Not a valid token firebase");
            });

        if (req.method === "POST" && tokenIdDecrypt) {
            // var Token = require('csrf')
            const tokens = new Tokens();
            // const secret = tokens.secretSync();
            // console.log("secre csrf: ", secret);
            //verify if ! return a problem
            // const tokenCsrf = tokens.create(secret);
           
            const tokenCsrf = tokens.create(
                process.env.NEXT_PRIVATE_CSRF_SECRET!
            );
            return res.status(200).json(tokenCsrf)
        }
        
    } catch (error) {
        res.status(400).json({
            error: `Erro call recived, but no method found!`,
        });
    }
}
