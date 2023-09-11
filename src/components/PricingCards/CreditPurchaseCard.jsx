



export default function CreditPurchaseCard({tier, currentUser, triggers}){


    return(
        <div className="col-span-2 mb-10 max-w-xs xs:min-w-[200px] p-4 border border-gray-200 transform *-translate-y-2* rounded-lg drop-shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-700 dark:bg-gradient-to-br dark:drop-shadow-xl dark:border-gray-700 ">
   <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300 ">Extra Credits</span>
                </li>
                <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">$5</span>
                </li>
                <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">5 hours</span>
                </li>

        </div>
    )


}