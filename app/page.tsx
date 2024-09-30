'use client'

import { FormEvent, useState } from "react"
import axios from "axios";

export default function Home() {
  const [ai,SetAi] = useState("");

  const handlePrompt = async(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt")

    const responseai = await axios.post('/api/responseai',{prompt});

    SetAi(responseai.data.geminiAiResponse);
    console.log(responseai.data.geminiAiResponse);
  }

  return (
    <div>
      <form onSubmit={handlePrompt}>
      <textarea name="prompt">talk about Jesus with twenty words</textarea>
      <button  className="bg-slate-600" type="submit"> send text</button>
      </form>
      {ai}
    </div>
  );
}
