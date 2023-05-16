import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckOutForm from "./CheckOutForm";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MeGOKJmF4J0rk0xCxBc6dR5K00J2dD5ubl4o8hxAiR1aWJq2LUsw3uLVPPmdKP82IKPX6Xhp0TG1P6QVDjmiT3y00mDm8PvrR")

export default function CheckOutPage() {
    
    const [clientSecret, setClientSecret] = useState("");
    const { currentUser } = useAuth()
    const [user, setUser] = useState("")
    const [called, setCalled] = useState(false)
    let userStripeId = ""
    const navigate =  useNavigate()


    useEffect(() => {  
        if (clientSecret.length === 0 && currentUser !== null && called === false) {
            setTimeout(() => {
                /* getCustomerInfo() */
                fetchData()
                setCalled(true)

            }, 2000)
           


        }

    })

  

    const fetchData = async () => {
        await currentUser.getIdToken().then((idToken) => {
console.log(idToken)
        axios.post(`${process.env.REACT_APP_API_URL}/payments/subscription`,{},
            {
                headers: {
                    'id-token': idToken,
                },
            },
        )
            .then(r => {
                
                
                const clientSecret = r.data[0].latest_invoice.payment_intent.client_secret
                
                
                setClientSecret(clientSecret)
                setCalled(true)
            }

            )
            .catch((error) => {
                if(error.response.data.detail ==="Already subscribed")
                {
                    navigate("/plans")
                }
                
            })
        })

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
                        <p className="text-zinc-500">$5.00</p>
                    </div>


                    <Elements options={options} stripe={stripePromise}>

                        <CheckOutForm clientSecret={clientSecret} />
                    </Elements>

                </div>)
                : (<Loading />
                )}

            {/* <button onClick={getCustomerInfo}>Get Current Data</button> */}

        </div>
    );

}