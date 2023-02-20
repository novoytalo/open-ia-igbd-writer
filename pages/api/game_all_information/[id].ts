import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../services/firebase-admin";
import Tokens from "csrf";
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
    const data_text = `fields *;where id < 1942;limit 100;`;

    const tokenCsrfFromFrontEnd = req.headers["x-csrf-token"]!.toString();
    const id = req.query.id;
    const searchItem = req.body;

    //decript token from frontend

    // console.log(plaintext);

    try {
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
            switch (id) {
                case "all":
                    await axios({
                        method: "post",
                        url: `${process.env.PRIVATE_IGBD_DB_HOST}/games`,
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
                    break;
                case "date":
                    const date = new Date(); // Date atual
                    const unixTimestamp = Math.floor(
                        date.getTime() / 1000
                    ).toString();
                    // console.log ('date uni?!',unixTimestamp)
                    const data_text_date = `fields *; where game.platforms = 48 & date <= ${unixTimestamp}; sort date asc;`;
                    await axios({
                        method: "post",
                        url: `${process.env.PRIVATE_IGBD_DB_HOST}/release_dates/`,
                        headers: {
                            "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
                            Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
                            "Content-Type": "text/plain",
                        },
                        data: data_text_date,
                    }).then((resposta) => {
                        // console.log(resposta.data);
                        // console.log("req body TTT:", req.headers.authorization);
                        return res.status(200).json(resposta.data);
                    });
                    break;
                case "search":
                    const data_search = `fields *; search "${searchItem}"; limit 50;`;
                    await axios({
                        method: "post",
                        url: `${process.env.PRIVATE_IGBD_DB_HOST}/search`,
                        headers: {
                            "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
                            Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
                            "Content-Type": "text/plain",
                        },
                        data: data_search,
                    }).then((resposta) => {
                        // console.log(resposta.data);
                        // console.log("req body TTT:", req.headers.authorization);
                        return res.status(200).json(resposta.data);
                    });
                    break;
                // case "":
                case "images_for_id_game":
                    // https://images.igdb.com/igdb/image/upload/t_{size}/{hash}.jpg
                    // cover_small	90 x 128	Fit
                    // screenshot_med	569 x 320	Lfill, Center gravity
                    // cover_big	264 x 374	Fit
                    // logo_med	284 x 160	Fit
                    // screenshot_big	889 x 500	Lfill, Center gravity
                    // screenshot_huge	1280 x 720	Lfill, Center gravity
                    // thumb	90 x 90	Thumb, Center gravity
                    // micro	35 x 35	Thumb, Center gravity
                    // 720p	1280 x 720	Fit, Center gravity
                    // 1080p	1920 x 1080	Fit, Center gravity

                    //the hash come from this axios resquest repost to fronten in the line "url", object;
                    //this url can be changed to size (on the frontend) based on this table above, to resize.

                    //exemple link https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg
                    //the 2x get biggest image retina (DPR 2.0) sizes (cover_small_2x).
                    const { gameId } = req.body;
                    // console.log("idGame?: ", gameId);
                    const data_text_gameid = `fields *;where game = ${gameId};`;
                    const respost = await axios({
                        method: "post",
                        url: `${process.env.PRIVATE_IGBD_DB_HOST}/screenshots`,
                        headers: {
                            "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
                            Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
                            "Content-Type": "text/plain",
                            // 'Cookie': 'value'
                        },
                        data: data_text_gameid,
                    }).then((resposta) => {
                        console.log(resposta.data);
                        return res.status(200).json(resposta.data);
                    });
                    // res.status(200).json(respost)

                    break;

                default:
                    break;
            }

            // res.status(200).json(respost)
        }
    } catch (error) {
        res.status(400).json({
            error: `Erro call recived, but no method found!`,
        });
    }
}
