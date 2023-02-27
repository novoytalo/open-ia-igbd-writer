// import openai from 'openai';
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../services/firebase-admin";
import { openai, configuration } from "../../../services/openia";
import decryptIdToken from "../cookiewithcript/auth-decryptIdToken";
import Tokens from "csrf";
// openai.apiKey = 'YOUR_KEY_API';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { text } = req.body;
//     const response = await openai.Completion.create({
//       prompt: `Escreva um artigo jornalístico com no mínimo 6 parágrafos baseado no seguinte texto: "${text}". O primeiro parágrafo deve ter emoção e o último também, com um parágrafo de desenvolvimento com história, outro sobre os personagens.`,
//       engine: 'text-davinci-002',
//       max_tokens: 10000,
//       n: 1,
//       stop: '.',
//     });
//     res.json(response.choices[0].text);
//   } catch (err) {
//     res.status(500).json({ message: 'Algo deu errado.' });
//   }
// };

// import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   organization: process.env.ORGANIZATION,
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export default async function OpenIAApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // console.log("animal: ", req.body);

    const textToApi = req.body.textToApi || "";
    if (textToApi.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid text",
            },
        });
        return;
    }
    try {
       

        const tokenCsrfFromFrontEnd = req.headers["x-csrf-token"]!.toString();
        const id = req.query.id;
        const test =  req.headers.authorization
        const searchItem = req.body;
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
                // console.log("api user data decoded", decodedTokenFireBase);
                const uid = decodedTokenFireBase.uid;
                return uid;

                // ...
            })
            .catch((error) => {
                // Handle error
                res.status(401).end("Not a valid token firebase");
            });
        // });
        /////////////////////////////////

        // if you prefer another way... use axios and use a existed route from openIA site.
        //   async function openAiGetText() {
        //     await axios({
        //         method: "post",
        //         url: "https://api.openai.com/v1/completions",
        //         data: {
        //             model: "text-davinci-003",
        //             prompt: "Say this is a test",
        //             max_tokens: 7,
        //             temperature: 0,
        //         },
        //         withCredentials: true,
        //         // headers: cookies !== undefined ? { cookie: cookies } : undefined,
        //         headers: {
        //             "Content-Type": "application/json",
        //             // I have to add cookie in the GET
        //             // Cookie: cookies.cookies,
        //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        //         },
        //     })
        //         .then((resposta) => {
        //             console.log(resposta);
        //             console.log(` response from api `, resposta.data);
        //         })
        //         .catch((error) => console.log(error));
        // }
         
            if(req.method === "POST" && tokenIdDecrypt){
                const completion = await openai.createCompletion({
                    model: "text-davinci-003",
                    max_tokens: 3000,
                    prompt: generatePrompt(textToApi),
                    temperature: 0.6,
                });
                res.status(200).json({ result: completion.data.choices[0].text });
            }
       
    } catch (error: any) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}

function generatePrompt(textToApi: string) { 
    //For now openAi is not give a valid link to Wikipedia if you request it to AI... some links is working... anothers just go to 
    //a error page from Wikipedia... 
    return `
    Create coherent, try not to repeat, use pronouns, linking pronouns and similar words or meanings, plaintext with the base text:"${textToApi}" and translate to {Brazilan portuguese}. The text need 5 paragraph  at least 100 words 100 words each (1 of introduction-make with a joke about history of the game together, 2 development paragraph  about history of the game include a joke randon, 1 emotional conclusion about the best and worse of the base text).`;

}
