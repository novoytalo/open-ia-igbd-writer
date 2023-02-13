// import openai from 'openai';
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../services/firebase-admin";
import { openai, configuration } from "../../../services/openia";
// openai.apiKey = 'SUA_CHAVE_API';

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
    console.log("animal: ", req.body);

    const tokenId = req.headers.authorization;
    if (!tokenId) {
        return res.status(401).end("Not a valid user");
    }
    //verifie this line... not working, no return console.log()
    const decodedToken = await //    admin
    // .
    auth
        .verifyIdToken(tokenId)
        .then((decodedToken) => {
            console.log("api user data decoded", decodedToken);
            const uid = decodedToken.uid;
            return uid
            // ...
        })
        .catch((error) => {
            // Handle error
            res.status(401).end("Not a valid token");
        });
    // });

    decodedToken;

    if (!configuration.apiKey && decodedToken) {
        res.status(500).json({
            error: {
                message:
                    "OpenAI API key not configured, please follow instructions in README.md",
            },
        });
        return;
    }

    const animal = req.body.animal || "";
    if (animal.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid animal",
            },
        });
        return;
    }

    try {
        // if you prefered aother way... use axios and usi a existed route from openIA site.
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

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(animal),
            temperature: 0.6,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
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

function generatePrompt(animal: any) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.
Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}