

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    ThemeProvider,
    Button,
    Spinner,
  } from "@material-tailwind/react";


export default function DownloadPopover ({tier,index,downloading,handleDownload,basicDataLoaded,themePopover}){


    return(
        <div
                                            className={`${
                                              index !== 0 ? "hidden" : ""
                                            }   flex ml-auto justify-end flex-row justify-end `}
                                          >
                                            <Popover>
                                              <PopoverHandler>
                                                <button
                                                  id="popoverButtonDownload"
                                                  data-popover-target="popoverHover"
                                                  data-popover-trigger="hover"
                                                  className={`${
                                                    tier === "free" ||
                                                    tier === undefined
                                                      ? "cursor-default dark:invert"
                                                      : ""
                                                  } mr-8 opacity-80 pt-4`}
                                                >
                                                  <button
                                                    className={`${
                                                      tier === "free" ||
                                                      tier === undefined
                                                        ? "bg-indigo-200 text-white pointer-events-none"
                                                        : ""
                                                    } text-sm  quicksand font-bold bg-indigo-300 dark:bg-indigo-400 w-[180px] drop-shadow-sm rounded-lg p-2 text-white`}
                                                  >
                                                    {downloading ? (
                                                      <Spinner
                                                        className="flex justify-center mx-auto opacity-70 pointer-events-none"
                                                        color="gray"
                                                      />
                                                    ) : (
                                                      "Download Transcript"
                                                    )}
                                                  </button>
                                                </button>
                                              </PopoverHandler>

                                              <div
                                                data-popover
                                                id="popoverHover"
                                                role="tooltip"
                                                className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white quicksand font-bold  rounded-lg shadow-sm opacity-0 dark:text-slate-200 dark:border-gray-600 dark:bg-mildDarkMode "
                                              >
                                                <ThemeProvider
                                                  value={themePopover}
                                                >
                                                  <PopoverContent background="indigo">
                                                    {tier !== undefined &&
                                                    tier != "free" &&
                                                    basicDataLoaded === true ? (
                                                      <div className="">
                                                        <div
                                                          onClick={() =>
                                                            handleDownload(1)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100  quicksand font-bold dark:hover:bg-zinc-200 dark:hover:text-slate-500"
                                                        >
                                                          <p className="quicksand font-bold">
                                                            Download as Plain
                                                            Subtitles (.srt)
                                                          </p>
                                                        </div>

                                                        <div
                                                          onClick={() =>
                                                            handleDownload(2)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100  quicksand font-bold dark:hover:bg-zinc-200 dark:hover:text-slate-500"
                                                        >
                                                          <p className="quicksand font-bold">
                                                            Download Formatted
                                                            Transcript (.txt)
                                                          </p>
                                                        </div>
                                                        <div
                                                          onClick={() =>
                                                            handleDownload(3)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100  font-averta-semibold dark:hover:bg-zinc-200 dark:hover:text-zinc-500"
                                                        >
                                                          <p className="font-averta-semibold">
                                                            Download as Plain
                                                            Text (.txt)
                                                          </p>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      <div className="px-3 cursor-pointer py-2 pointer-events-none ">
                                                        <p className="quicksand font-bold">
                                                          Upgrade your plan to
                                                          download the
                                                          transcript
                                                        </p>
                                                      </div>
                                                    )}
                                                  </PopoverContent>
                                                </ThemeProvider>
                                              </div>
                                            </Popover>
                                          </div>
    )
}