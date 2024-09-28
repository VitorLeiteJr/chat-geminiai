import { GoogleGenerativeAI } from "@google/generative-ai";

type apiProps = {
    modal: string,
    prompt: string
}
export const gemini = async (values: apiProps) =>{

    const genAI = new GoogleGenerativeAI(process.env.KEY as string);
    const model = genAI.getGenerativeModel({ model: values.modal});

      try{

    const result = await model.generateContent(values.prompt); 
    return result.response.text();

        }catch{
            return "something is wrong, fix it";
             }  

}