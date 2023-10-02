// QaWsManagerHook.js
import { useEffect } from 'react';
import QaWsManager from './QaWsManager';

export const useQaWsManager = ({question, source,setAnswerData,triggerWs,setTriggerWs, isCleared, setIsLoadingInside}) => {
  let wsManager

  useEffect(() => {
    if(isCleared){
      setAnswerData({answer:"",sources:[]})
    }

    if(triggerWs!==true){
      return
    }

    setTriggerWs(false)
    wsManager = new QaWsManager({
      apiInfo: {
        apiHost: "backend-staging-2459.up.railway.app",
        ssl: true,
      },
      callbacks: {
        setSources: (sources) => {
       
          setAnswerData((prevData) => ({
            ...prevData,
            sources: sources,
          }));
          
        },
        setAnswer: (answer) => {
          setIsLoadingInside(false)
       
          setAnswerData((prevData) => ({
            ...prevData,
            answer: answer,
          }));
          
        },
        onError: (reason) => {
          console.error(`Error in main: ${reason}`);
        }
      },
      question,
      source,
    });

    

    // Close the WebSocket connection after 10 seconds
    setTimeout(() => {
      wsManager.close();
    }, 10000);
  }, [question, source]); // Re-run the effect if `question` or `arcId` changes


  
};
