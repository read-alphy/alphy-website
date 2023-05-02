import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckOutForm from "./CheckOutForm";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MeGOKJmF4J0rk0xCxBc6dR5K00J2dD5ubl4o8hxAiR1aWJq2LUsw3uLVPPmdKP82IKPX6Xhp0TG1P6QVDjmiT3y00mDm8PvrR")

export default function App() {
    const [clientSecret, setClientSecret] = useState("");
    const { currentUser } = useAuth()
    const [user, setUser] = useState("")
    const [called, setCalled] = useState(false)
    let userStripeId = ""


    useEffect(() => {
        if (clientSecret.length === 0 && currentUser !== null && called === false) {
            setTimeout(() => {
                getCustomerInfo()
                fetchData()
                setCalled(true)

            }, 2000)

        }
    })

    const getCustomerInfo = async () => {
        await axios.get(`https://backend-staging-2459.up.railway.app/payments/subscriptions?user_id=${currentUser.uid}}`)
            //await axios.get(`https://backend-staging-2459.up.railway.app/payments/subscriptions?user_id=1233322111`)
            .then(r => {
                if (r.data !== null) {
                    const userStripe = r.data
                    setUser(userStripe)
                    userStripeId = userStripe
                    console.log(userStripe)
                    setCalled(true)
                }
                else {
                    setUser("")
                }
            })
    }

    const fetchData = async () => {

        //await axios.post(`https://backend-staging-2459.up.railway.app/payments/subscribe?subscription_type=price_1N2dm5JmF4J0rk0xWfZYHspj&user_id=${currentUser.uid}&user_email=${currentUser.email}`)
        await axios.post(`https://backend-staging-2459.up.railway.app/payments/subscribe?subscription_type=price_1N2dm5JmF4J0rk0xWfZYHspj&user_id=${currentUser.uid}&user_email=${currentUser.email}`)
            .then(r => {
                const clientSecret = r.data.latest_invoice.payment_intent.client_secret
                setClientSecret(clientSecret)
            }

            )


    }







    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };



    return (
        <div className="mx-auto items-center">
            {/* <button onClick={fetchData}>Create</button> */}


            {clientSecret.length > 0 ? (
                <div className="container max-w-[400px] mx-auto items-center mt-20 mb-20">
                    <div className="mb-10">
                        <p className="text-xl mb-5">Alphy Monthly Subscription</p>
                        <p className="text-zinc-500">$10.00</p>
                    </div>


                    <Elements options={options} stripe={stripePromise}>

                        <CheckOutForm clientSecret={clientSecret} />
                    </Elements>

                </div>)
                : (<Loading />
                )}

            <button onClick={getCustomerInfo}>Get Current Data</button>

        </div>
    );

}