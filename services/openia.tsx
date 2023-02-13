import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const response = OpenAIApi(configuration);

//this is how can call a text model
//the waite can be put on the local function as used
//isolade in here it have no use.
const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 7,
});
//another model:
//the generatePrompt() is a local function tha can be created by programmer
// const completion = openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: generatePrompt(animal),
//     temperature: 0.6,
// });

export { openai, configuration };
