import React from "react";
import "tailwindcss/tailwind.css";
import { Carousel } from "react-responsive-carousel";


export default function PricingTable() {



    return (

        <div id="detailed-pricing" className="w-full mx-auto  container items-center flex flex-wrap max-w-[1000px] overflow-x-auto">
            <div className="overflow-hidden min-w-max border-4 border-blueLike">
                <div className="grid grid-cols-3 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 dark:text-white">
                    <div className="flex items-center"></div>
                    <div className="">                    <h5 className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Free</h5>
                        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Wanderers</h5>
                        <div className="flex items-baseline text-gray-900 dark:text-white">

                            <span className="text-5xl font-bold tracking-tight">Free</span>

                        </div>
                        <p className="mt-3 text-gray-400">Discover Alphy's capabilities. </p></div>
                    <div>                    <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">Premium</h5>
                        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5>
                        <div className="flex items-baseline text-gray-900 dark:text-white">
                            <span className="text-3xl font-semibold">$</span>
                            <span className="text-5xl font-extrabold tracking-tight">10</span>
                            <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span>
                        </div>
                        <p className="mt-3 text-gray-400">Level up your reach. </p></div>

                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 dark:text-zinc-300 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-zinc-300">Basic components (<a href="#" className="text-blue-600 hover:underline">view all</a>)</div>
                    <div>
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                    <div>
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>

                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 dark:text-zinc-300 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-zinc-300">Application UI (<a href="#" className="text-blue-600 hover:underline">view demo</a>)</div>
                    <div>
                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </div>
                    <div>
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>

                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 dark:text-zinc-300 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-zinc-300">Marketing UI pre-order</div>
                    <div>
                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </div>
                    <div>
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>

                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 dark:text-zinc-300 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-zinc-300">E-commerce UI pre-order</div>
                    <div>
                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </div>
                    <div>
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>

                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 dark:text-zinc-300 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-zinc-300"></div>
                    <div>
                        <a href="#" className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Buy now</a>
                    </div>
                    <div>
                        <a href="#" className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Buy now</a>
                    </div>

                </div>
            </div>
        </div>

    )
}