import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';

export default function QuestionFlashCard(props, {baseSources,setBaseSources}) {

    const [isHovered, setIsHovered] = useState(false );
    const navigate = useNavigate();
    const [flipped, setFlipped] = useState(false);
    const [expanded, setExpanded] = useState(false);

    let displayText
    
  const flip = () => {
    setFlipped(!flipped);
  };
  

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const elementsToCheck = ["?", ".", "...", "!", ":",";",undefined  ];


    if(window.innerWidth>768){
      displayText = expanded ? props.key_qa[props.item].answer: `${props.key_qa[props.item].answer[349]===" "? props.key_qa[props.item].answer.slice(0, 349) : props.key_qa[props.item].answer.slice(0, 350)}${elementsToCheck.includes(props.key_qa[props.item].answer[350]) ? "":"..."}`;
  }
      else{
      displayText = expanded ? props.key_qa[props.item].answer: `${props.key_qa[props.item].answer[149]===" "? props.key_qa[props.item].answer.slice(0, 149) : props.key_qa[props.item].answer.slice(0, 150)}${elementsToCheck.includes(props.key_qa[props.item].answer[350]) ? "":"..."}`;
  }
  
console.log(props.key_qa[props.item].answer[350])

    return(
                <div>
                  
      

    
             <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                   
                            <div className={`bg-white dark:bg-mildDarkMode min-h-[480px] max-h-[480px] min-w-[360px] max-w-[360px] drop-shadow-lg items-center p-5  relative `}
                                 onClick={flip}
                                 >
                                      
                                        <p className={` bg-opacity-100 text-lg font-bold text-zinc-600 dark:text-zinc-300 pt-2 ml-2 mt-20`} >{props.item}</p>
                                      
                                    </div>    
                          
                                     
                                    <div className={`bg-white dark:bg-mildDarkMode min-h-[480px] max-h-[480px] min-w-[360px] max-w-[360px] drop-shadow-lg items-center p-5 relative ${flipped ? "":""} `}
                                 onClick={flip}
                                 >
                                      <p className={` bg-opacity-100 text-lg font-bold text-zinc-600 dark:text-zinc-300 pt-2 ml-2`} >{props.item}</p>
                                      <p id="answer-area" className="answer-area text-zinc-700 dark:text-zinc-300 font-normal text-md overflow-y-scroll max-h-[300px] mt-6" dangerouslySetInnerHTML={{ __html: displayText}} />
                                      



                                                              <button
                                                                                    className={`cursor-pointer justify-end mt-2 mx-auto flex`}
                                                                                    onClick={() => setBaseSources(!baseSources)}
                                                                                  >
                                                                                    <span className={`${baseSources ? 'hidden' : 'block'} text-zinc-600 dark:text-zinc-200 text-l pr-1`}>
                                                                                      See the sources.
                                                                                    </span>
                                                                                    <svg
                                                                                      className={`${baseSources ? 'hidden' : 'block'} `}
                                                                                      aria-hidden="true"
                                                                                      fill="currentColor"
                                                                                      viewBox="0 0 24 24"
                                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                                      width="30px"
                                                                                    >
                                                                                      <path
                                                                                        clipRule="evenodd"
                                                                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                                                                                        fillRule="evenodd"
                                                                                      ></path>
                                                                                  </svg>
                                                            </button>
                          
                      </div>
                      
                      
              </ReactCardFlip>        



                      
                  </div>
              )
}