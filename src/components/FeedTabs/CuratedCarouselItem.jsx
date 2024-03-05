import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CuratedCarouselItem(props) {
  const [isHovered, setIsHovered] = useState(false)
  

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  let description = ''
  if (
    props.item.description !== undefined &&
    props.item.description.length > 50
  ) {
    if (window.innerWidth < 600 || props.forFeed === true) {
      description = `${
        props.item.description[49] === ' '
          ? props.item.description.slice(0, 49)
          : props.item.description.slice(0, 50)
      }...`
    } else {
      description = `${
        props.item.description[69] === ' '
          ? props.item.description.slice(0, 69)
          : props.item.description.slice(0, 70)
      }...`
    }
  } else {
    if (
      props.item.description !== undefined &&
      props.item.description.length === 0
    ) {
      description = 'No description.'
    } else {
      description = props.item.description
    }
  }

  return (
    <Link href={`/arc/${props.item.uid}`}>
      {props.expandedLayout !== true ? (
        <div
          className={`relative min-w-[150px] max-w-[150px] ${
            props.forFeed !== true && 'lg:min-w-[220px] lg:max-w-[150px]'
          } lg:w-64  dark:bg-darkMode  rounded-md overflow-hidden shadow-md cursor-pointer`}
        >
          <img src={props.item.thumbnail_url} />

          <div
            className={` ${
              !isHovered && props.item.thumbnail_url !== null
                ? 'opacity-0'
                : 'opacity-100 transition duration-300 ease-in-out'
            } rounded-md  absolute inset-0 bg-zinc-700 dark:bg-stone-800 dark:border dark:border-stone-600 bg-opacity-80 transition duration-300 ease-in-out items-center justify-center`}
          >
            <div className="flex flex-col py-2 px-4 ">
              <p
                className={`text-white bg-opacity-100 text-sm ${
                  props.forFeed !== true && 'lg:text-lg'
                } mb-5 font-averta-semibold`}
              >
                {props.item.name}
              </p>
              <p
                className={`text-white bg-opacity-100 text-xs ${
                  props.forFeed !== true && 'lg:text-sm'
                } font-averta-regular`}
              >
                {description}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></div>
        </div>
      ) : (
        <div className="mb-16 md:mb-6">
          <div className="hidden lg:block bg-white dark:bg-mildDarkMode min-h-[360px] max-h-[360px] min-w-[240px] max-w-[240px] drop-shadow-lg items-center p-5 transform hover:scale-105 transition duration-300 ease-in-out rounded-xl">
            <div
              className={`relative mx-auto min-w-[180px] max-w-[180px] ${
                props.forFeed !== true && 'lg:min-w-[220px] lg:max-w-[150px]'
              } lg:w-64  overflow-hidden shadow-md cursor-pointer`}
            >
              <img src={props.item.thumbnail_url} />
            </div>
            <p
              className={` bg-opacity-100 text-lg text-zinc-600 dark:text-zinc-300 pt-2 ml-2 font-averta-semibold`}
            >
              {props.item.name}
            </p>
            <p
              className={` bg-opacity-100 text-sm text-zinc-500 dark:text-zinc-500 pt-2 ml-2 font-averta-regular`}
            >
              {description}
            </p>
          </div>

          <div className="lg:hidden drop-shadow-xl rounded-lg bg-white dark:bg-mildDarkMode min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] transform hover:scale-105 transition duration-300 ease-in-out ">
            <div
              className={`relative min-w-[150px] max-w-[150px] ${
                props.forFeed !== true && 'lg:min-w-[220px] lg:max-w-[150px]'
              } lg:w-64  overflow-hidden drop-shadow-xl rounded-xl  cursor-pointer `}
            >
              <img src={props.item.thumbnail_url} />

              <div
                className={` ${
                  !isHovered && props.item.thumbnail_url !== null
                    ? 'opacity-0'
                    : 'opacity-100 transition duration-300 ease-in-out'
                }   absolute inset-0    dark:bg-stone-800 dark:border dark:border-stone-600 bg-opacity-80 transition duration-300 ease-in-out items-center justify-center`}
              >
                <div className="flex flex-col py-2 px-4 ">
                  <p
                    className={`text-white bg-opacity-100 text-xs ${
                      props.forFeed !== true && 'lg:text-sm'
                    } font-averta-regular`}
                  >
                    {props.item.description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></div>
            </div>

            <p
              className={` bg-opacity-100 text-md text-zinc-500 dark:text-zinc-300 pt-2  ml-2 max-w-[150px] font-averta-semibold`}
            >
              {props.item.name}
            </p>
          </div>
        </div>
      )}
    </Link>
  )
}
