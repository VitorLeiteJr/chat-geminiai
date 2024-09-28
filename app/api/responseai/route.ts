import { gemini } from "@/app/_helpers/geminiai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) =>{

    const body = await req.json();
    const {prompt} = body;

    const values = {
        modal: "gemini-1.5-flash",
        prompt: prompt
    };     

    const geminiAiResponse =await gemini(values);

    return NextResponse.json({geminiAiResponse});


}