'use client'
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react"
import FormInput from "../_components/form";
import { input } from "../_helpers/types";
import PromptMessages from "../_components/promptMessage";


const Chat = () => {
const [message, setMessage] = useState<input>([]);
const nameRef = useRef<HTMLInputElement>(null);
const chatContainerRef = useRef<HTMLDivElement>(null);

useEffect(()=>{
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
},[message])

const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

   
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("input") as string;    
     if (nameRef.current) nameRef.current.value = '';

    setMessage([...message, { text: prompt, classNameFather: 'flex',
      classNameChildren: 'bg-gray-300 text-black p-2 rounded-lg max-w-xs' }]);

    const responseAI =await axios.post('api/responseai',{prompt});

    setMessage((prevMessages)=>[...prevMessages,{text: responseAI.data.geminiAiResponse, 
      classNameFather: ' flex justify-end',
      classNameChildren: 'bg-blue-200 text-black p-2 rounded-lg max-w-xs'}]);

}

  return (
    <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div className="bg-blue-500 p-4 text-white flex justify-center items-center">
         Chat App    
    </div>
        
    <PromptMessages
    chatContainerRef={chatContainerRef}
    message={message}
    />
    
    <FormInput
    handleSubmit={handleSubmit}
    nameRef={nameRef}    
    />
    
  </div>   
  )
}

export default Chat