import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
  memo,
} from 'react'
import SideFeed from '../SideFeed/SideFeed'

// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import Link from 'next/link'
import {useRouter} from 'next/router'
import ArchipelagoCreation from './ArchipelagoCreation'
import { Button, Spinner, Input, Textarea } from '@material-tailwind/react'
import ArchipelagoChat from './ArchipelagoChat'
import EditArchipelago from './EditArchipelago'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import Dialog from '@mui/material/Dialog'
import Loading from '../Loading'
import axios from 'axios'

import jsonData from './arcs_and_thumbnails.json' // TODO: replace with API call
import { API_URL } from '../../constants'


export default function ArcMain({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  idToken,
  userArchipelagos,
  setUserArchipelagos,
  credit,
  
  setCreditCalled,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn,
}) {
  const router = useRouter()
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  const [called, setCalled] = useState(false)
  const [sourceIDsArchipelago, setSourceIDsArchipelago] = useState([])
  const [dataArchipelago, setDataArchipelago] = useState([])
  const [data, setData] = useState([])
  const [archipelagoInfo, setArchipelagoInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [archipelagoDescription, setArchipelagoDescription] = useState('')
  const [archipelagoTitle, setArchipelagoTitle] = useState('')
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [subCalled, setSubCalled] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [helmetThumbnail, setHelmetThumbnail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [authorizationError, setAuthorizationError] = useState(false)

  const isCreateArc = router.asPath.split('/')[2] === 'createArc'
  const isEditArc = router.asPath.split('/')[2] === 'editArc'
  const isArc =
    router.asPath.split('/')[1] === 'arc' &&
    router.asPath.split('/')[2] !== 'editArc' &&
    router.asPath.split('/')[2] !== 'createArc'
  const isArchipelago = router.asPath.split('/')[1] === 'archipelago'

  let item_thumbnail
  let item_name
  if (isArc || isEditArc) {
    const item = jsonData.find(
      t => t.arc_id === router.asPath.split('/')[2]
    )
    if (item !== undefined) {
      item_thumbnail = item.thumbnail_url
      item_name = item.name
    }
  }

  useEffect (() => {
    if (isArc && sessionStorage.getItem('arcAction') === 'true') {
      sessionStorage.removeItem('arcAction')
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    
    if (isArchipelago) {
      const newPathname = router.asPath.replace('archipelago', 'arc')
      router.push(newPathname)
    }

    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }

    if (dataArchipelago !== null && dataArchipelago.length > 1) {
      setErrorMessage(false)
    }
  })

  useEffect(() => {
    if (
      (isArc || isEditArc) &&
      sessionStorage.getItem('arcAction') === 'true'
    ) {
      sessionStorage.removeItem('arcAction')
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    if ((isArc || isEditArc) && data.length === 0 && called !== true) {
      handleArcInfo()
    }
  }, [currentUser])

  const handleArcInfo = async () => {
    setAuthorizationError(false)
    sessionStorage.removeItem('arcAction')

    if ((isArc || isEditArc) && data.length === 0 && called !== true) {
      setIsLoading(true)
      let idToken
      if(currentUser){
        idToken = currentUser.accessToken
      }
    

      source_id = isArc
        ? router.query.arc_id
        : router.asPath.split('/')[3]

      try {
        await axios
          .get(`${API_URL}/playlists/${source_id}?nof_questions=30`, {
            headers: {
              accept: 'application/json',
              'id-token': idToken!==null ? idToken : null,
            },
          })
          .then(response => {
            
            setAuthorizationError(false)
            setCalled(true)
            setData(response.data)

            setIsVisible(response.data.is_visible)
            localStorage.setItem('isVisible', response.data.is_visible)
            setIsPublic(response.data.is_public)
            setArchipelagoInfo(response.data)
            if (response.data.description === 'null') {
              setArchipelagoDescription('')
            } else {
              setArchipelagoDescription(response.data.description)
            }
            setArchipelagoTitle(response.data.name)
            
            setDataArchipelago(response.data.tracks)
            let sources = response.data.tracks.map(item => item.source_id)
            setSourceIDsArchipelago([...sources])
            setIsLoading(false)
          })
      } catch (error) {
        setIsLoading(false)
        
        /* setCalled(true) */
        

        if (axios.isCancel(error)) {
          console.log('Request cancelled')
        }

        if (
          (error.response.data.detail =
            'You are not authorized to see this playlist.')
        ) {
          setAuthorizationError(true)
        } else {
          console.log('arcChat error', error)
        }

        /* router.push("/404") */
      }
    }
  }


  const handleArchipelago = () => {
    // disallow creating if dataarchipelago is empty
    // disallow creating if there is a limit on the number of archipelagos
    // disallow creating if there is a limit on the number of videos to include in a archipelago
    // disallow creating if the user is not logged in
    if (dataArchipelago.length === 0) {
      setErrorMessage(true)
      return
    } else {
      try {
        if (isCreateArc) {
          setIsLoadingSubmit(true)
          axios
            .post(
              `${API_URL}/playlists/`,
              {
                name: archipelagoTitle.length > 0 ? archipelagoTitle : 'My Arc',
                user_id: currentUser.uid,
                description: archipelagoDescription,
                sources: [...dataArchipelago],
              },
              {
                headers: {
                  'id-token': currentUser.accessToken,
                },
              }
            )
            .then(response => {
              sessionStorage.setItem('arcAction', 'true')
              setTimeout(() => {
                router.push(`/arc/${response.data.uid}`)
                setIsLoadingSubmit(false)
              }, 2000)
            })
        } else if (isEditArc) {
          setIsLoadingSubmit(true)
          sessionStorage.setItem('arcAction', 'true')
          axios
            .patch(
              `${API_URL}/playlists/${archipelagoInfo.uid}`,
              {
                name: archipelagoTitle.length > 0 ? archipelagoTitle : 'My Arc',
                user_id: currentUser.uid,
                description: archipelagoDescription,
                sources: [...dataArchipelago],
              },
              {
                headers: {
                  'id-token': currentUser.accessToken,
                },
              }
            )
            .then(response => {
              sessionStorage.setItem('arcAction', 'true')
              setTimeout(() => {
                router.push(`/arc/${response.data.uid}`)
                setIsLoadingSubmit(false)
              }, 2000)
            })
        }
      } catch (error) {
        setIsLoadingSubmit(false)
        console.log('arcChat error', error)
        if (axios.isCancel(error)) {
          console.log('Request cancelled')
        } else if (error.response.status === 400) {
          setErrorMessage(true)
        }
      }
    }
  }
  const handleDeleteArchipelago = () => {
    setIsLoadingDelete(true)

    axios
      .delete(`${API_URL}/playlists/${archipelagoInfo.uid}`, {
        headers: {
          'id-token': currentUser.accessToken,
        },
      })
      .then(response => {
        const index = userArchipelagos.indexOf(archipelagoInfo)
        userArchipelagos.splice(index, 1)
        setUserArchipelagos([...userArchipelagos])
        router.push(`/`)
      })
      .catch(error => {
        console.log(error)
        setIsLoadingDelete(false)
      })
  }

  const handleVisibility = () => {
    const targetVisibility = !isVisible
    localStorage.setItem('isVisible', isVisible)
    try {
      axios
        .patch(
          `${API_URL}/playlists/${archipelagoInfo.uid}/visibility?visibility=${targetVisibility}`,
          null,
          {
            headers: {
              accept: 'application/json',
              'id-token': currentUser.accessToken,
            },
          }
        )
        .then(response => {
          localStorage.setItem('isVisible', targetVisibility)
          setIsVisible(targetVisibility)
          setIsPublic(targetVisibility)
        })
    } catch (error) {
      console.log('arcChat error', error)
      if (axios.isCancel(error)) {
        console.log('Request cancelled')
      } else if (error.response.status === 400) {
        setErrorMessage(true)
      }
    }
  }

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform sm:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row ">
        {
          <div className={`hidden ${isArc ? 'md:flex' : 'md:flex'} `}>
            <SideFeed
            loggedIn = {loggedIn}
            setLoggedIn = {setLoggedIn}
              currentUser={currentUser}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              source_id={source_id}
              dataArchipelago={dataArchipelago}
              tier={tier}
              sandboxHistory={sandboxHistory}
              setSandboxHistory={setSandboxHistory}
              isArc={isArc}
            />
          </div>
        }

        <div
          className={`fixed top-0 z-50 transition origin-top-right transform ${
            isArc ? 'md:hidden' : 'md:hidden'
          }  w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-white'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="">
              <SideFeed
              loggedIn = {loggedIn}
              setLoggedIn = {setLoggedIn}
                currentUser={currentUser}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                source_id={source_id}
                dataArchipelago={dataArchipelago}
                tier={tier}
                sandboxHistory={sandboxHistory}
                setSandboxHistory={setSandboxHistory}
                isArc={isArc}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } md:px-20 pb-20 sm:pb-0 w-full sm:max-h-[100vh] ${
            collapsed ? 'hidden' : ' overflow-hidden'
          }}`}
        >
          {isCreateArc &&
            (currentUser ? (
              (tier === 'free' && userArchipelagos.length < 1) ||
              (tier === 'basic' && userArchipelagos.length < 3) ||
              tier === 'premium' ? (
                <ArchipelagoCreation
                  userArchipelagos={userArchipelagos}
                  tier={tier}
                  archipelagoDescription={archipelagoDescription}
                  dataArchipelago={dataArchipelago}
                  setDataArchipelago={setDataArchipelago}
                  archipelagoTitle={archipelagoTitle}
                  setArchipelagoDescription={setArchipelagoDescription}
                  setArchipelagoTitle={setArchipelagoTitle}
                  sourceIDsArchipelago={sourceIDsArchipelago}
                  setSourceIDsArchipelago={setSourceIDsArchipelago}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  credit={credit}
                  setCreditCalled={setCreditCalled}
                />
              ) : isLoadingSubmit === false ? (
                <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 flex flex-col">
                  <p className="quicksand font-semibold">
                    You've already have the maximum number of Arcs for your
                    plan.
                  </p>

                  <p className="mt-4 quicksand font-semibold">
                    <Link
                      href="/account"
                      className="dark:text-greenColor text-green-400 underline quicksand font-semibold "
                    >
                      Upgrade
                    </Link>{' '}
                    your plan to create more Arcs.
                  </p>
                </div>
              ) : null
            ) : (
              <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 pl-5">
                <div className="mb-10">
                  <Link
                    href="/submit"
                    className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

                    <span className="text-sm  quicksand font-semibold">
                      Go Back
                    </span>
                  </Link>
                </div>
                <Link
                  href="/u/login"
                  className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
                >
                  Sign in
                </Link>{' '}
                or{' '}
                <Link
                  href="/u/register"
                  className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
                >
                  {' '}
                  create an account
                </Link>{' '}
                to access this page.
              </div>
            ))}

          {!isCreateArc && !isEditArc ? (
            isLoading ? (
              <Loading />
            ) : authorizationError ? (
              <div className="mx-10 mx-auto md:mx-20  mt-20 md:mt-40">
                <div className="text-xl  text-zinc-700 dark:text-zinc-300 max-w-[600px] quicksand font-semibold">
                  The arc you're trying to reach either doesn't exist or you
                  don't have permission to access it. Check out arcs by Alphy{' '}
                  <Link
                    href="/arcs"
                    className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
                  >
                    here
                  </Link>
                  .
                </div>
              </div>
            ) : (
              <ArchipelagoChat
                data={data}
                setData={setData}
                currentUser={currentUser}
                dataArchipelago={dataArchipelago}
                setDataArchipelago={setDataArchipelago}
                handleVisibility={handleVisibility}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                tier={tier}
              />
            )
          ) : null}

          {isEditArc &&
            (currentUser ? (
              <EditArchipelago
                archipelagoInfo={archipelagoInfo}
                tier={tier}
                setArchipelagoInfo={setArchipelagoInfo}
                userArchipelagos={userArchipelagos}
                archipelagoDescription={archipelagoDescription}
                dataArchipelago={dataArchipelago}
                setDataArchipelago={setDataArchipelago}
                archipelagoTitle={archipelagoTitle}
                setArchipelagoDescription={setArchipelagoDescription}
                setArchipelagoTitle={setArchipelagoTitle}
                sourceIDsArchipelago={sourceIDsArchipelago}
                setSourceIDsArchipelago={setSourceIDsArchipelago}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                credit={credit}
                setCreditCalled={setCreditCalled}
              />
            ) : (
              <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 quicksand font-semibold pl-5">
                <Link
                  href="/u/login"
                  className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
                >
                  Sign in
                </Link>{' '}
                or{' '}
                <Link
                  href="/u/register"
                  className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
                >
                  {' '}
                  create an account
                </Link>{' '}
                to access this page.
              </div>
            ))}
        </div>
      </div>
      {((isCreateArc &&
        ((tier === 'free' && userArchipelagos.length < 1) ||
          (tier === 'basic' && userArchipelagos.length < 3) ||
          tier === 'premium')) ||
        isEditArc) && (
        <div
          className={`z-50 absolute bottom-0 w-full flex h-[40px] ${
            currentUser ? '' : 'hidden'
          } ${
            !collapsed  && 'hidden lg:block'
          } lg:bg-transparent dark:lg:bg-transparent`}
        >
          <div className="flex justify-end items-center flex-grow mr-10 lg:mr-40 pb-10 lg:pb-40 ">
            {isEditArc && !isLoadingSubmit && (
              <Button
                size={"md"}
                className="bg-red-400 px-5 mr-5 quicksand font-semibold"
                onClick={() => setDeleteDialog(true)}
              >
                {' '}
                <DeleteIcon /> <span className="mt-1">Delete </span>
              </Button>
            )}
            {
              <Button
                size={"md"}
                className={`bg-greenColor px-5 quicksand font-semibold ${
                  isLoadingSubmit &&
                  'bg-green-300 pointer-events-none min-w-[106.533px]'
                }`}
                onClick={handleArchipelago}
              >
                {isLoadingSubmit ? (
                  <Spinner
                    color="white"
                    size={"md"}
                    className="flex mx-auto"
                  />
                ) : (
                  <div className="pb-6">
                    <SaveIcon className="mr-2 " />
                    {isCreateArc ? 'Create' : 'Save'}
                  </div>
                )}
              </Button>
            }
          </div>
          {deleteDialog && (
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
              <div className="p-10 w-[240px] h-[120px] flex md:w-[360px] md:h-[180px] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-mildDarkMode items-center text-center justify-center drop-shadow-sm flex-col">
                <p className="mb-10 quicksand font-semibold">
                  You are about to delete this arc. Would you like to continue?
                </p>
                <div>
                  {isLoadingDelete ? (
                    <div>
                      <Spinner
                        color="green"
                        size="sm"
                        className="flex mx-auto opacity-40 mb-2"
                      />
                      <p className="text-zinc-500 dark:text-zinc-600 italic quicksand font-semibold">
                        Deleting...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-row">
                      <p
                        className="text-greenColor cursor-pointer quicksand font-semibold"
                        size="sm"
                        onClick={() => setDeleteDialog(false)}
                      >
                        Cancel
                      </p>
                      <div className="border-r h-full mr-4 ml-4"></div>
                      <p
                        className="text-red-400 cursor-pointer quicksand font-semibold"
                        size="sm"
                        onClick={handleDeleteArchipelago}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Dialog>
          )}
        </div>
      )}
    </div>
  )
}


