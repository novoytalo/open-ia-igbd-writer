import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../services/firebase-admin";
import Tokens from "csrf";

//IT'S THE BASE ... CAN BE USED BUT I'M USING THE NEWEST BIG QUERY AS DEFAULT

import decryptIdToken from "../cookiewithcript/auth-decryptIdToken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //comand line for the api
    const data_text = `query games "Playstation Games" {
        fields name,platforms.name, genres.name, screenshots.url ;
        where platforms !=n & platforms = (48) & genres = (15);
        sort  id;
        limit 100;
    };`;

    try {
        const tokenCsrfFromFrontEnd = req.headers["x-csrf-token"]!.toString();
        const id = req.query.id;
        const searchItem = req.body;
        console.log("tokenCsrfFromFrontEnd2: ", tokenCsrfFromFrontEnd);
        // const tokenId:{value:string} = req.headers.cookie!

        const tokenIdDecrypt = await decryptIdToken(req, res);

        if (!tokenIdDecrypt) {
            return res.status(401).end("Not a valid user");
        }

        //////////////////////////////////
        const tokenId =
            req.headers.authorization === undefined
                ? ""
                : req.headers.authorization;
        const tokenIIId = tokenId && tokenId.split(" ")[1];

        const tokens = new Tokens();
        if (
            !tokens.verify(
                process.env.NEXT_PRIVATE_CSRF_SECRET!,
                tokenCsrfFromFrontEnd
            )
        ) {
            return res.status(401).end("No valid token Csrf");
        }
        /////////////////////////////////
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
                res.status(401).end("Not a valid token firebase");
            });
        // });

        if (req.method === "POST" && tokenIdDecrypt) {
            await axios({
                method: "post",
                url: `${process.env.PRIVATE_IGBD_BIG_QUERY_DB_HOST}`,
                headers: {
                    "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
                    Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
                    "Content-Type": "text/plain",
                },
                data: data_text,
            }).then((resposta) => {
                // console.log(resposta.data);
                // console.log("req body TTT:", req.headers.authorization);
                return res.status(200).json(resposta.data);
            });
        }
    } catch (error) {
        res.status(400).json({
            error: `Erro call recived, but no method found!`,
        });
    }
}
