import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckOutForm from "./CheckOutForm";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { useNavigate,useLocation } from "react-router-dom";
import StripeBanner from "../../img/stripe_banner.svg";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
//const stripePromise = loadStripe("pk_live_51MeGOKJmF4J0rk0xzE0Cl6UmLItHqja1URuUZGHsfOpoATmt60o5CDG3rNXyHrvd28CCxUnb5biyLOMewIz0psQz00mEIfPVl6")
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`)


export default function CheckOutPageInfo({clientSecret,setClientSecret}) {
    const location = useLocation()
    const { currentUser } = useAuth()
    const [user, setUser] = useState("")
    const [called, setCalled] = useState(false)
    let userStripeId = ""
    const navigate =  useNavigate()


	const searchParams = new URLSearchParams(location.search);
  
	const subValue = searchParams.get('sub') || "premium";

    useEffect(() => {  
        
        if ((clientSecret===null || clientSecret===undefined || clientSecret.length === 0) && currentUser !== null && called === false) {
            setTimeout(() => {
                
                fetchData()
                setCalled(true)

            }, 2000)
           


        }

    })

  

    const fetchData = async () => {
       
        await currentUser.getIdToken().then((idToken) => {

        axios.post(`${process.env.REACT_APP_API_URL}/payments/subscription?subscription_type=${subValue}`,{},
            {
                headers: {
                    'id-token': idToken,
                },
            },
        )
            .then(r => {
                sessionStorage.setItem("subValue",subValue)
                const clientSecret = r.data.latest_invoice.payment_intent.client_secret  
                setClientSecret(clientSecret)
                setCalled(true)
            }

            )
            .catch((error) => {
                console.log(error)
                
            })
        })

    }




let appearance

    if(localStorage.getItem("theme")==="dark"){
        appearance = {
            theme: 'night',
        }
    }
    else{
    appearance = {
        theme: 'stripe',
    };
}
    const options = {
        clientSecret,
        appearance,
    };



    return (
        <div className="h-[110vh] dark:bg-darkMode bg-zinc-50">
        <div className="mx-auto container items-center pt-10 max-h-[95vh] px-5">
            {/* <button onClick={fetchData}>Create</button> */}


            {(clientSecret!==undefined && clientSecret!==null) && clientSecret.length > 0 ? (
                <div className="container max-w-[400px] mx-auto items-center ">
                    <div className="mb-10 mt-8 md:mt-20">
                        <p className="text-xl mb-5">{subValue==="basic" ? "Alphy Basic Subscription" : "Alphy Premium Subscription"}</p>
                        <p className="text-zinc-500">{subValue==="basic" ? "$5.00/month" : "$12/month"} </p>
                       
                    </div>
                    
                  

                    <Elements options={options} stripe={stripePromise}>

                        <CheckOutForm clientSecret={clientSecret} />
                    </Elements>
                    

                </div>)
                : (<Loading />
                )}

            {/* <button onClick={getCustomerInfo}>Get Current Data</button> */}

        </div>
        </div>
    );

}