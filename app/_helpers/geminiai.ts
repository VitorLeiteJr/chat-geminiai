import { GoogleGenerativeAI } from "@google/generative-ai";

type apiProps = {
    modal: string,
    prompt: string
}
export const gemini = async (values: apiProps) =>{

    const genAI = new GoogleGenerativeAI(process.env.KEY as string);
    const model = genAI.getGenerativeModel({ model: values.modal});

    const result = await model.generateContent(values.prompt);
    console.log(result.response.text());

    return result.response.text();

}