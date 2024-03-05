import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CheckOutForm from './CheckOutForm'

import Loading from '../Loading'

/* import StripeBanner from '../../img/stripe_banner.svg' */
import { API_URL, STRIPE_PK } from '../../constants'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
//const stripePromise = loadStripe("pk_live_51...")
const stripePromise = loadStripe(STRIPE_PK)

export default function CheckOutPageInfo({ clientSecret, setClientSecret,currentUser }) {
  
  

  const [called, setCalled] = useState(false)
  
  

  

  const subValue = 'premium'

  useEffect(() => {
    if (
      (clientSecret === null ||
        clientSecret === undefined ||
        clientSecret.length === 0) &&
      currentUser !== null &&
      called === false
    ) {
      fetchData()
      fetchData2()
      setCalled(true)
    }
  })
 
  const fetchData = async () => {
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/subscription?subscription_type=${subValue}`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          sessionStorage.setItem('subValue', subValue)
          const clientSecret =
            r.data.latest_invoice.payment_intent.client_secret
        
          setClientSecret(clientSecret)
          setCalled(true)
        })
        .catch(error => {
          console.log(error)
        })
    })
  } 

  

  const fetchData2 = async () => {
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/v2/subscription`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          console.log(r.data)
          /* window.location.href = r.data.url */
        })
         .catch(error => {
          console.log(error)
        })
    })
  }



  let appearance

  if (localStorage.getItem('theme') === 'dark') {
    appearance = {
      theme: 'night',
    }
  } else {
    appearance = {
      theme: 'stripe',
    }
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="h-[110vh] dark:bg-darkMode bg-white">
      <button onClick={() => fetchData2()}className="bg-blue-400 px-2 rounded-lg py-4">CREATE SUBSCRIPTION</button>
      <div className="mx-auto container items-center pt-10 max-h-[95vh] px-5">
        {/* <button onClick={fetchData}>Create</button> */}

        {clientSecret !== undefined &&
        clientSecret !== null &&
        clientSecret.length > 0 ? (
          <div className="container max-w-[400px] mx-auto items-center ">
            <div className="mb-10 mt-8 md:mt-20">
              <p className="text-xl mb-5">
                {subValue === 'basic'
                  ? 'Alphy Basic Subscription'
                  : 'Alphy Premium Subscription'}
              </p>
              <p className="text-zinc-500">
                {subValue === 'basic' ? '$5.00/month' : '$12/month'}{' '}
              </p>
            </div>

            <Elements options={options} stripe={stripePromise}>
              <CheckOutForm clientSecret={clientSecret} currentUser={currentUser} />
            </Elements>
          </div>
        ) : (
          <Loading />
        )}

        {/* <button onClick={getCustomerInfo}>Get Current Data</button> */}
      </div>
    </div>
  )
}
