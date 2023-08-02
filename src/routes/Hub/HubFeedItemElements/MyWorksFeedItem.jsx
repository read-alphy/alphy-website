


export default function MyWorksFeedItem({item,index, source_id,imageUrl,language_codes}){



    return(
        <a href={ `/${item.source_type}/${source_id}`} >
					<div className="flex flex-col max-w-[250px]">
						<div
							className={`
							
							 
							sm:hover:scale-10 transform sm:hover:scale-105
							cursor-pointer 
							 p-2 rounded-md mb-2 transition duration-200 ease-in-out`}
							
							target="_blank"
						>
							<div className={`  min-w-[100px] max-w-[200px] mr-3 `}>
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

							<div className={`xs:ml-0 sm:ml-0 justify-start text-xs min-w-[200px] max-w-[200px] mt-1`} >
							
								
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

								
							</div>


						</div>
					</div>
				</a>

    )
}