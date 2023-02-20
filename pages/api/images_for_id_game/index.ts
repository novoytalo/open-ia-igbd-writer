import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {};

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { gameId } = req.body;
    // console.log("idGame?: ", gameId);
    const data_text = `fields *;\r\nwhere game = ${gameId};`;
    //we have here the id of image that return directly image path (only)
    //and id of game that return all imagens ref of that game (multiples)
    // const data_text = `fields *;\r\nwhere game = ${id};\r\nlimit 100;`

    try {
        if (req.method === "POST") {
            const respost = await axios({
                method: "post",
                url: `${process.env.PRIVATE_IGBD_DB_HOST}/screenshots`,
                headers: {
                    "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
                    Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
                    "Content-Type": "text/plain",
                    // 'Cookie': 'value'
                },
                data: data_text,
            }).then((resposta) => {
                console.log(resposta.data);
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
