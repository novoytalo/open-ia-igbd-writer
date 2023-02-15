import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../services/firebase-admin";
import CryptoJS from "crypto-js";
import { type } from "os";
// import { Auth, getAuth } from "firebase-admin/auth";
// import {} from "../../../services/auth";

import decryptIdToken from "../cookiewithcript/auth-decryptIdToken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //comand line for the api
    const data_text = `fields *;\r\nwhere id < 1942;\r\nlimit 100;`;

    //decript token from frontend

    // console.log(plaintext);

    try {
        // const tokenId:{value:string} = req.headers.cookie!
        console.log("Before second api");
        const tokenIdDecrypt = await decryptIdToken(req, res);
        console.log("After second api");
        if (!tokenIdDecrypt) {
            return res.status(401).end("Not a valid user");
        }

        const decodedToken = await //    admin
        // .
        auth
            .verifyIdToken(tokenIdDecrypt)
            .then((decodedTokenFireBase) => {
                console.log("api user data decoded", decodedTokenFireBase);
                const uid = decodedTokenFireBase.uid;
                return uid;

                // ...
            })
            .catch((error) => {
                // Handle error
                res.status(401).end("Not a valid token");
            });
        // });

        if (req.method === "POST" && decodedToken) {
            const respost = await axios({
                method: "post",
                url: `${process.env.PUBLIC_NEST_DB_HOST}`,
                headers: {
                    "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
                    Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
                    "Content-Type": "text/plain",
                },
                data: data_text,
            }).then((resposta) => {
                console.log(resposta.data);
                console.log("req body TTT:", req.headers.authorization);
                return res.status(200).json(resposta.data);
            });
            // res.status(200).json(respost)
        }
    } catch (error) {
        res.status(400).json({
            error: `Erro call recived, but no method found!`,
        });
    }
}
