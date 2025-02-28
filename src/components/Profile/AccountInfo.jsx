import React from 'react'
import 'tailwindcss/tailwind.css'

import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

import FreeCard from './PricingCards/FreeCard'
import BasicCard from './PricingCards/BasicCard'
import PremiumCard from './PricingCards/PremiumCard'

import Loading from '../Loading'
import { PlusCircle, MinusCircle, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { API_URL } from '../../constants'


export default function AccountInfo({
  credit,
  tier,
  currentUser,
  canceledAtPeriodEnd,
}) {
  
  const [isYearly, setIsYearly] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [creditPurchaseLoading, setCreditPurchaseLoading] = useState(false)
  const [subscriptionLinkLoading, setSubscriptionLinkLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [creditPurchaseDialog, setCreditPurchaseDialog] = useState(false)
  const [called, setCalled] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [openPopover1, setOpenPopover1] = useState(false)

  const handleQuantityChange = event => {
    const value = event.target.value

    // Ensure the value is numeric
    if (!isNaN(value)) {
      setQuantity(parseInt(value, 10))
    }
    if (value === '') {
      setQuantity('')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('creditPurchase') === 'true') {
      setCreditPurchaseDialog(true)
      sessionStorage.removeItem('creditPurchase')
    }
  }, [])

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const handleBlur = () => {
    if (quantity === 0) {
      setQuantity(1)
    } else if (quantity === '') {
      setQuantity(1)
    }
  }

  


  //Popover
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  }

  const triggers1 = {
    onMouseEnter: () => setOpenPopover1(true),
    onMouseLeave: () => setOpenPopover1(false),
  }

  const buyCredit = async () => {
    setCreditPurchaseLoading(true)
    try {
      await currentUser.getIdToken().then(idToken => {
        axios
          .post(
            `${
              API_URL || 'http://localhost:3001'
            }/payments/credit?quantity=${quantity}`,
            {},
            {
              headers: {
                accept: 'application/json',
                'id-token': idToken,
              },
            }
          )
          .then(response => {
            setCreditPurchaseLoading(false)
            window.location.reload()
          })
      })
    } catch (error) {
      console.log(error)
      setCreditPurchaseLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser !== null && called === false) {
      try {
        //getCustomerInfo(currentUser)
        setTimeout(() => {
          setIsLoaded(true)
        }, 400)
        setCalled(true)
      } catch (e) {
        console.log(e)
        setTimeout(() => {
          setIsLoaded(true)
        }, 400)
        setCalled(true)
      }
    } else {
      setIsLoaded(true)
    }
  }, [currentUser, called])

  const getSubscriptionLink = async () => {
    setSubscriptionLinkLoading(true)
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/v2/subscription?subscription_period=${isYearly ? 'yearly' : 'monthly'}`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          setSubscriptionLinkLoading(false)
          window.open(r.data.url, '_blank');
        
        

        })
         .catch(error => {
          setSubscriptionLinkLoading(false)
          console.log(error)
        })
    })
  }

  
  
  const getCreditPurchaseLink= async () => {
    setCreditPurchaseLoading(true)
    let localQuantity = quantity > 0 ? quantity : 1
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/v2/credit?quantity=${localQuantity}`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          setCreditPurchaseLoading(false)
          window.open(r.data.url, '_blank')
          setCreditPurchaseDialog(false)
        })
         .catch(error => {
          setCreditPurchaseLoading(false)
          console.log(error)
        })
    })
  }






  return (
    <div className="dark:bg-darkMode pb-20 md:pl-10  3xl:pl-40">
      {isLoaded ? (
        <div className="dark:bg-darkMode">
          <div className="max-w-[200px] min-w-[200px] flex-row flex"></div>

         
            <div className=" hidden xl:flex flex-col w-full max-w-[1200px] pt-20 grid grid-col-3 mb-30 ">
              <div className="items-center margin-auto justify-center flex flex-col">
                {currentUser ? (
                  <div>
                    <h2 className="text-md dark:text-zinc-300 text-slate-700 mb-10 quicksand font-bold ">
                      Account Details
                    </h2>

                    <div className="grid grid-cols-3 mb-5 max-w-[900px]">
                      <div className="col-span-1 text-slate-600 dark:text-zinc-400 text-sm">
                        <p className="mb-2 quicksand font-bold">Your Email</p>
                        <p className="mb-2 quicksand font-bold">Password</p>
                        {credit !== null ? (
                          <p className="mt-2 quicksand font-bold">
                            Remaining Credits
                          </p>
                        ) : null}
                        <p className="mt-2 quicksand font-bold">Plan</p>
                      </div>
                      <div className="border-r border-gray-300 h-[10vh] col-span-1  mx-auto items-center flex"></div>
                      <div className="col-span-1 text-slate-700 dark:text-zinc-200 text-sm">
                        <p className="mb-2 quicksand font-normal">
                          {currentUser.email}
                        </p>
                        <a
                          href="/u/resetpassword"
                          className="mb-2 underline quicksand font-normal"
                        >
                          Reset password
                        </a>
                        {credit !== null ? (
                          <p className="mt-2 quicksand font-normal">
                            {Math.floor(credit)} minutes
                          </p>
                        ) : null}
                        <p className="mt-2 quicksand font-normal">
                          {tier === 'free' && 'Starter'}
                          {tier === 'basic' && 'Basic'}
                          {tier === 'premium' && 'Premium'}
                        </p>
                        {
                          <div className="mt-4 flex flex-col ">
                            <Button
                              size="sm"
                              variant="secondary"
                              className={`bg-indigo-300 text-white max-w-[150px] ${
                                tier === 'basic' || tier === 'premium'
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              } quicksand font-bold`}
                              onClick={() => setCreditPurchaseDialog(true)}
                            >
                              <Plus className="mr-2 h-4 w-4 dark:text-zinc-800" />
                              <span className="mt-1 dark:text-zinc-800 quicksand font-bold">
                                Buy Credits
                              </span>
                            </Button>
                            {tier === 'free' && (
                              <span className=" quicksand font-normal text-slate-600 dark:text-zinc-300 text-sm  mt-4 ">
                                Upgrade to a paid plan to get credit topups.
                              </span>
                            )}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {/*                                 {currentUser && <div className="border-b border-gray-300 w-[50vw] mt-10 mb-20 mx-auto items-center flex"></div>}

 */}

              <p className="text-center text-slate-700 dark:bg-darkMode dark:text-zinc-300 text-xl 2xl:text-2xl  mt-20 quicksand font-bold">
                Manage Subscription{' '}
              </p>
              {tier !== 'premium' && (
                <p className="text-center text-slate-700  dark:bg-darkMode dark:text-zinc-300   mt-6 mb-20 max-w-[600px] items-center justify-center mx-auto">
                  Upgrade to have extra transcription credits, submit from
                  multiple platforms, upload audio files, and access most
                  capable AI models.
                </p>
              )}

              {tier !== 'free' ? (
                <a
                  className="text-center mb-10 text-slate-700 dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline quicksand font-bold mb-4"
                  target="_blank"
                  href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"
                >
                  {' '}
                  {canceledAtPeriodEnd
                    ? 'We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link.'
                    : 'Change payment details or cancel subscription'}
                </a>
              ) : null}

              <div className="flex flex-wrap justify-center md:space-x-4 md:items-stretch"></div>
            </div>
        
            <div className="xl:hidden mb-10">
              <div className="items-center margin-auto justify-center flex flex-col mt-20">
                {currentUser ? (
                  <div className="px-4 sm:mx-0">
                    <h2 className="text-md text-slate-700 dark:text-zinc-300 mb-10 quicksand font-bold ">
                      Account Details
                    </h2>

                    <div className="grid grid-cols-3 mb-5  ">
                      <div className="col-span-1 text-slate-600 dark:text-zinc-400 text-sm border-r border-gray-300 pr-4">
                        <p className="mb-3 quicksand font-bold">Your Email</p>
                        <p className="mb-3 quicksand font-bold">Password</p>
                        {credit !== null ? (
                          <p className="mt-2 quicksand font-bold">
                            Remaining <br></br>Credits
                          </p>
                        ) : null}
                        <p className="mt-2 quicksand font-bold">Plan</p>
                      </div>
                      {/* <div className="border-r border-gray-300 h-[10vh] col-span-1 mx-auto items-center flex"></div> */}
                      <div className="col-span-2 text-black dark:text-zinc-200 text-sm ml-6">
                        <p className="mb-3 quicksand font-normal">
                          {currentUser.email}
                        </p>
                        <a
                          href="/u/resetpassword"
                          className="mb-2 underline quicksand font-normal"
                        >
                          Reset password
                        </a>
                        {credit !== null ? (
                          <p className="mt-5 quicksand font-normal">
                            {Math.floor(credit)} minutes
                          </p>
                        ) : null}

                        <p className="mt-5 quicksand font-normal">
                          {tier === 'free' && 'Starter Plan'}
                          {tier === 'basic' && 'Basic Plan'}
                          {tier === 'premium' && 'Premium Plan'}
                        </p>
                        {
                          <div className="mt-4 flex flex-col">
                            <Button
                              size="sm"
                              variant="secondary"
                              className={`bg-indigo-300 text-white max-w-[150px] ${
                                tier === 'basic' || tier === 'premium'
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`}
                              onClick={() => setCreditPurchaseDialog(true)}
                            >
                              <Plus className="mr-2 h-4 w-4 dark:text-zinc-800" />
                              <span className="mt-1 dark:text-zinc-800 quicksand font-bold">
                                Buy Credits
                              </span>
                            </Button>
                            {tier === 'free' && (
                              <span className=" quicksand font-normal text-slate-600 dark:text-zinc-300 text-sm  mt-4 ">
                                Upgrade to a paid plan to get credit topups.
                              </span>
                            )}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <p className="text-center text-slate-700 dark:bg-darkMode dark:text-zinc-300 text-xl xl:text-2xl font-semibold mt-20 mb-10">
                Manage Subscription{' '}
              </p>

              {tier !== 'premium' && (
                <p className="text-center text-slate-700  dark:bg-darkMode dark:text-zinc-300   mt-6 xl:mb-20 max-w-[600px] items-center justify-center mx-auto">
                  Upgrade to have extra transcription credits, submit from
                  multiple platforms, upload audio files, and access most
                  capable AI models.
                </p>
              )}
              {currentUser ? (
                <div className="items-center flex flex-col justify-center">
                  {tier !== 'free' ? (
                    <a
                      className="text-center text-slate-700 dark:bg-darkMode max-w-[600px] dark:text-zinc-300 text-l mx-auto justify-center underline font-semibold mb-4"
                      target="_blank"
                      href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"
                    >
                      {' '}
                      {canceledAtPeriodEnd
                        ? 'We are sorry to see you go. You can enjoy the premium benefits until the next billing period and can renew your subscription anytime through this link.'
                        : 'Change payment details or cancel subscription'}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>



            

          

          <div className="flex   mx-auto xl:mx-0 items-center justify-center flex-col max-w-[1200px]">
            

      <div className="flex gap-6 flex-row justify-center my-6  xl:ml-20  px-4 py-2 rounded-xl ">
  
  <p className={`text-lg font-bold ${isYearly ? "text-slate-700 dark:text-white" : " text-indigo-400"} quicksand`} >Monthly</p>
          <Switch
        checked={isYearly}
        onChange={() => setIsYearly(!isYearly)}
        sx={(theme) => ({
          '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
          '--Switch-thumbBackground': "#818cf8",
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '70px',
          '--Switch-trackHeight': '30px',
          '--Switch-trackBackground': '#334155',
          [`& .${switchClasses.thumb}`]: {
            transition: 'width 0.2s, left 0.2s',
  
          },
          '&:hover': {
            
            '--Switch-trackBackground': '#334155',
          },
          '&:active': {
            '--Switch-thumbWidth': '32px',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-thumbBackground': '#818cf8',
            '--Switch-trackBackground': '#334155',
            '&:hover': {
              '--Switch-trackBackground': '#334155', 
            },
          },
        })}
      />
      <p className={`text-lg font-bold ${isYearly===false ? "text-slate-700 dark:text-white" : "text-indigo-400"} quicksand`} >
      Yearly (Save 40%)</p>
        
    </div>

    <div className="flex flex-col xl:flex-row  px-4 gap-y-8 xl:gap-y-0 gap-x-4 2xl:gap-x-8">
      <div className="hidden xl:flex"> 
            <FreeCard
              currentUser={currentUser}
              tier={tier}
              triggers1={triggers1}
              openPopover1={openPopover1}
              setOpenPopover1={setOpenPopover1}
              canceledAtPeriodEnd={canceledAtPeriodEnd}

            />

</div>
            <PremiumCard
              currentUser={currentUser}
              tier={tier}
              triggers={triggers}
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              canceledAtPeriodEnd={canceledAtPeriodEnd}
              getSubscriptionLink= {getSubscriptionLink}
              subscriptionLinkLoading={subscriptionLinkLoading}
              isYearly={isYearly}
            />

<div className="xl:hidden"> 
            <FreeCard
              currentUser={currentUser}
              tier={tier}
              triggers1={triggers1}
              openPopover1={openPopover1}
              setOpenPopover1={setOpenPopover1}
              canceledAtPeriodEnd={canceledAtPeriodEnd}

            />

</div>


          </div>
        </div>
        </div>
      ) : (
        <div className="mx-auto">
          <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
        </div>
      )}

      <Dialog
        fullWidth={'true'}
        maxWidth={'sm'}
        open={creditPurchaseDialog}
        onClose={() => setCreditPurchaseDialog(false)}
      >
        <div className="h-[400px] p-10 text-slate-700 text-sm dark:text-zinc-300 dark:bg-mildDarkMode  text-center items-center">
          <p className="text-lg quicksand font-bold ">
            You are about to purchase extra credits.
          </p>
          <p className=" quicksand font-bold">
            Update quantity to scale your minutes proportionally.
          </p>

          <div className="mt-6">
            <p
              className="quicksand font-bold
                                                                             text-lg"
            >
              {' '}
              ${quantity * 5}
            </p>
            <p className="quicksand font-bold">
              {quantity * 300} minutes (={quantity * 5} hours)
            </p>
          </div>

          <div className="flex flex-col  text-center items-center">
            <div className="flex flex-row mt-6">
              <RemoveCircleIcon
                className={`cursor-pointer text-zinc-300 mt-2 mr-2  ${
                  quantity > 1
                    ? 'opacity-60'
                    : 'opacity-30 pointer-events-none text-zinc-200'
                }`}
                onClick={handleDecrement}
              />
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-[70px] rounded-lg border border-gray-200 quicksand font-bold text-center dark:bg-mildDarkMode focus:outline-none focus:ring-0 focus:border-indigo-400"
              />

              <AddCircleIcon
                className="cursor-pointer mt-2 ml-2 opacity-60 text-zinc-300"
                onClick={handleIncrement}
              />
            </div>

            <Button
              className={`bg-indigo-300 w-[200px] mt-6 py-3 ${
                (quantity < 1 || creditPurchaseLoading) &&
                'pointer-events-none opacity-60'
              }`}
              size="md"
              onClick={() => getCreditPurchaseLink()}
            >
              {creditPurchaseLoading ? (
                <CircularProgress
                  color="inherit"
                  className="opacity-40 w-5 text-center margin-auto w-full"
                  size={20}
                />
              ) : (
                <p className="py-1 dark:text-zinc-800 text-md quicksand font-bold">
                  Purchase
                </p>
              )}
            </Button>
            <p className="items-center margin-auto flex mt-4 quicksand font-normal">
              You will be charged automatically.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
