

import {Link} from "react-router-dom"
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


export default function MyWorksFeedItem({item,index, source_id,imageUrl,language_codes}){


let model_name = ""
if(item.summaries!==undefined && item.summaries.find(item => item.lang==="en")!==undefined){
	model_name= item.summaries.find(item => item.lang==="en").model_name
}

    return(
        <Link to={ `/${item.source_type}/${source_id}`} >
					<div className="flex flex-col xs:max-w-[250px] ">
					
						<div
							className={`
							
						 
							transform sm:hover:scale-105
							cursor-pointer 
							 p-2 rounded-md mb-2 transition duration-200 ease-in-out`}
							
							target="_blank"
						>
							<div className={`  min-w-[320px] max-w-[320px]  xs:min-w-[100px] xs:max-w-[200px] mr-3 `}>
								<div
									className="flex w-full  h-0 dark:opacity-80  rounded-md bg-gray-600"
									style={{
										backgroundImage: `url(${imageUrl})`,
										paddingBottom: '50%',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',

									}}
									
								></div>
						
							
							
							
							</div>
							
							<div className={`xs:ml-0 sm:ml-0 justify-start text-xs min-w-[300px] max-w-[300px] xs:min-w-[200px] xs:max-w-[200px] mt-1`} >
							
								
								{(item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true)) ? null : (
									<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
								)}
								<div className={`text-sm video-text text-black dark:text-zinc-300 font-normal`} >
								
									{item.title}
									{item.source !==undefined && item.source.title}
									</div>
								<div className="font-light_ text-zinc-500 dark:text-zinc-300 ">
									{item.creator_name}
									{item.source !==undefined && item.source.creator_name}
									</div>
								<div className="font-light text-zinc-400 dark:text-zinc-300 flex flex-row">
									
									{item.summaries!==undefined &&
							
									item.summaries.map ((summary,index) => (
										
										<div className={index!==0 && "ml-1"}>
											{language_codes[summary.lang]}
											{index!==item.summaries.length-1 && ","}
										</div>
									))
									}
									
									</div>
									{model_name==="gpt-4" && 
									
									<p className="text-indigo-400 ">
										<WorkspacePremiumIcon fontSize="small" className="text-indigo-300 -ml-1"/>
									<span className="pt-1 text-xs">Premium</span>
										</p>
										}
								
							</div>


						</div>
					</div>
				</Link>

    )
}