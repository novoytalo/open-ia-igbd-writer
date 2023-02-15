import { NextApiRequest, NextApiResponse } from "next";
import nookies, { destroyCookie, parseCookies, setCookie } from "nookies";
import CryptoJS from "crypto-js";
// import cookie from 'cookie';
export default async function handlerEncryptToken(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const IdtokenFireBase =
        req.headers.authorization === undefined
            ? ""
            : req.headers.authorization;
    const tokenOnly = IdtokenFireBase && IdtokenFireBase.split(" ")[1];
    const key =
        process.env.NEXT_PUBLIC_MY_SECRET_KEY === undefined
            ? ""
            : process.env.NEXT_PUBLIC_MY_SECRET_KEY;
    // const { token } = req.body;
    console.log("token from createcookiewithcript", IdtokenFireBase);
    console.log("tokenOnly: ", tokenOnly);
    const ctx = { req, res };
    try {
        const tokenIdEncrypt = CryptoJS.AES.encrypt(
            tokenOnly.toString(),
            key
        ).toString();
        // const tokenIdDecrypt = CryptoJS.AES.decrypt(tokenIdEncrypt, key).toString(CryptoJS.enc.Utf8);

        //If need or have a problem like on firebase:
        //"using cookies
        // When using Firebase Hosting in conjunction with Cloud Functions or Cloud Run,
        // cookies are generally removed from incoming requests. This is necessary to allow
        // efficient CDN caching behavior. Only the specially named __session cookie is
        //allowed to pass through to the execution of your application.
        // When present, the __session cookie automatically becomes part
        // of the cache key, which means that it is impossible for two users
        // with different cookies to receive each other's cached response. Only
        // use the __session cookie if your application serves different content
        //depending on user authorization."
        // nookies.set(ctx, "__session", 'value!', {
        // for now this solution is not need
        nookies.set(ctx, "token", tokenIdEncrypt, {
            // keys:process.env.,
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            secure: true,
            // httpOnly: true,
            // sameSite: "strict",
            // secret: process.env.NEXT_PUBLIC_COOKIE_SECRET,
        });
        //And if you have some problem you can use cookie, another library, to solve it (need to install)
        // const serializedCookie = cookie.serialize('nome-do-cookie', 'valor-do-cookie');
        // res.setHeader('Set-Cookie', serializedCookie);
        res.status(200).json({ message: "Cookie sucess!", cookie: "" });
    } catch (error) {
        res.status(400).json({
            error: `Erro call recived, but no method found!`,
        });
    }
}
