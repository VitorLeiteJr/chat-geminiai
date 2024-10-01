'use client'
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react"

type input = {
  text: string,
  classNameFather: string,
  classNameChildren: string
}[]

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

    <div     
    ref={chatContainerRef}
    style={{ height: '300px' }}
    className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">    
            
            {message?.map((msg,index)=>(
                  <div key={index} className={msg.classNameFather}>
                  <div className={msg.classNameChildren}>
                    {msg.text}
                  </div>
                </div>  
            ))}
          
        </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="bg-white p-4 flex items-center">
       
        <input ref={nameRef} name="input"type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none" required/>
        <button 
        className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
     
    </div>
    </form>
    
  </div>   
  )
}

export default Chat