
import React, { useEffect, useState } from 'react';
import { Option,Select, Button } from '@material-tailwind/react';
import { useAuth } from '../hooks/useAuth';
import { set } from 'lodash';




export default function WelcomeForm({setShowWelcomeForm}){
 
  const [profession, setProfession] = useState("")
  const [fromWhere, setfromWhere] = useState("")
  const [forWhat, setForWhat] = useState("")
  const [showform, setShowForm] = useState(true)


  const {currentUser} = useAuth()
  if(currentUser!==null){
  var metadata = currentUser.metadata
  
  }
  


const handleProfession = (event) => {
  
  setProfession(event)


}

const handleFromWhere = (event) => {
  setfromWhere(event)

}

const handleShowWelcomeMessage = () => {
  setShowWelcomeForm(false)
  
}


    return(
        <div className="flex flex-col w-full pl-10 py-5 pr-5">
          <div className="flex justify-end ">
												<svg
										width="16"
										onClick={handleShowWelcomeMessage}

										className="cursor-pointer col-span-1 text-zinc-400 justify-end justify-self-end mt-2"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M6 18L18 6M6 6l12 12"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
					</div>
    
          {showform ? 
          <div>
          <div className="mb-10 pr-5 pl-1">
          
            <div className="flex flex-row">
            
              <div>
            <h1 className="ml-1 text-xl text-zinc-700 font-semibold dark:text-zinc-300"> Welcome to Alphy!</h1>
            <p className="ml-1 mt-5 text-l text-zinc-600 dark:text-zinc-300">Please tell us a bit about yourself. It will only take 30 seconds.</p>
            </div>
           
                    </div>
          </div>
      {/*   <form onSubmit={(e) => changeMetadata(e)}>
          <div>
          <span> What kind of work do you do?</span>
          <Select value={profession} variant="static" className={`select-option border border-gray-400 rounded-md h-10 text-md mt-5 focus:border-greenColor`} onChange= {handleProfession} required name="workType" id="workType" className="form-control">
          <Option className="hover:bg-zinc-50" value="">Select...</Option>
                <Option className="hover:bg-zinc-50" value="academic">Academic Research</Option>
                <Option className="hover:bg-zinc-50" value="education">Education</Option>
                <Option className="hover:bg-zinc-50" value="student">Student</Option>
                <Option className="hover:bg-zinc-50" value="contentCreation">Content Creation</Option>
                <Option className="hover:bg-zinc-50" value="journalism">Journalism</Option>
                <Option className="hover:bg-zinc-50" value="marketing">Marketing</Option>
                <Option className="hover:bg-zinc-50" value="consulting">Consulting</Option>
                <Option className="hover:bg-zinc-50" value="entrepreneurship">Entrepreneurship</Option>
                <Option className="hover:bg-zinc-50" value="technology">Technology</Option>
                <Option className="hover:bg-zinc-50" value="healthcare">Healthcare</Option>
                <Option className="hover:bg-zinc-50" value="other">Other</Option>
            </Select>
            </div>

            <div className="mt-10">
            <p for="useCase">In what area do you think Alphy will support you the most?</p>
        <Select  value={forWhat} variant="static" className={`select-option border border-gray-400 rounded-md h-10 text-md mt-5 focus:border-greenColor`} onChange={handleForWhat} required name="useCase" id="useCase" className="form-control">
            <Option className="hover:bg-zinc-50" value="">Select...</Option>
            <Option className="hover:bg-zinc-50" value="learnNewThings">Learn A Skillset Faster</Option>
            <Option className="hover:bg-zinc-50" value="researchSupport">Support My Research</Option>
            <Option className="hover:bg-zinc-50" value="createContent">Create Content</Option>
            <Option className="hover:bg-zinc-50" value="languageTranslation">Access Content From Other Languages</Option>
            <Option className="hover:bg-zinc-50" value="stayInformed">Stay Informed</Option>
            <Option className="hover:bg-zinc-50" value="recreational">Recreational</Option>
            <Option className="hover:bg-zinc-50" value="other">Other</Option>
        </Select>
        </div>
        <div className="mt-10">
            <p for="useCase">Where did you hear from us?</p>
        <Select  value={fromWhere} variant="static" className={`select-option border border-gray-400 rounded-md h-10 text-md mt-5 focus:border-greenColor`} onChange={handleFromWhere}  required name="useCase" id="useCase" className="form-control">
            <Option className="hover:bg-zinc-50" value="">Select...</Option>
            <Option className="hover:bg-zinc-50" value="twitter">Twitter</Option>
            <Option className="hover:bg-zinc-50" value="recommendation">Recommendation (friend, co-worker, community)</Option>
            <Option className="hover:bg-zinc-50" value="linkedin">LinkedIn</Option>
            <Option className="hover:bg-zinc-50" value="aiToolAggregator">AI Tool Aggregator</Option>
            <Option className="hover:bg-zinc-50" value="onlineSearch">Online Search</Option>
            <Option className="hover:bg-zinc-50" value="youtube">YouTube</Option>
            <Option className="hover:bg-zinc-50" value="other">Other</Option>
          
        </Select>
        </div>
        <Button className="font-sans mt-10 bg-greenColor" type="submit">Submit</Button>
        </form> */}
<div >
  {localStorage.getItem("theme")==="light" ? 
        <iframe className="h-[600px] sm:w-[430px]" src={`https://tally.so/embed/mVQV4E?user_id=${currentUser!==null && currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=0`}></iframe>
        :
        <iframe className="h-[600px] sm:w-[430px]" src={`https://tally.so/embed/mDk5Mp?user_id=${currentUser!==null && currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=0`}></iframe>
      }
        </div>
        </div>
:
      <div className="mb-10"> 
        <p className="text-2xl">Thank you!</p>
      </div>}

        </div>
    )
}
