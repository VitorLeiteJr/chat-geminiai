import React, { RefObject } from 'react'
import { input } from '../_helpers/types'

interface promptMsgProps {
    chatContainerRef: (RefObject<HTMLDivElement>),
    message: input,    
}

const PromptMessages = ({chatContainerRef,message}:promptMsgProps) => {
  return (
    
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
  )
}

export default PromptMessages