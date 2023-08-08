import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
    PaymentElement,
    LinkAuthenticationElement,
    AddressElement,
    ExpressCheckoutElement,
    useStripe,
    useElements,
    CardElement,

} from "@stripe/react-stripe-js";
import StripeBanner from "../../img/stripe_banner.svg";


export default function CheckOutForm({ clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser } = useAuth();

    const [name, setName] = useState('Jenny Rosen');
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState("");


    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
        if (currentUser) setEmail(currentUser.email);
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const paymentElement = elements.getElement(PaymentElement);


        setIsLoading(true);
        try {
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "https://alphy.app/plans/checkout/success",
                }
            }
            )



            if (result.error) {
                console.error('Payment failed');
                setIsLoading(false)
            } else {
                console.log('Payment succeeded');
                setIsLoading(false)

            }
        } catch (error) {
            console.error('Error:', error);
        }

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.


        setIsLoading(false);
        setPaymentIntent("none");

    };

    const paymentElementOptions = {
        layout: "tabs",
        clientSecret: clientSecret,

    }

    return (
        <form className="dark:text-whiteLike  pb-20" id="payment-form" onSubmit={handleSubmit}>

            <LinkAuthenticationElement
                className="pointer-events-none"
                id="link-authentication-element"

                options={{ defaultValues: { email: currentUser ? currentUser.email : "" } }}
            />
            <AddressElement
            options={{mode:"billing"}}/>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            

            {/*             <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',

                        },

                    },
                }}
            /> */}
            <button className={`items-center w-full ${isLoading ? "bg-green-200 pointer-events-none" : "bg-greenColor"} ${paymentIntent.length > 0 ? "pointer-events-none" : ""} text-whiteLike rounded-md mt-5 min-h-[40px] text-center`} disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className="">
                    {isLoading ?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{
                                margin: "auto",
                                background: "none",
                                display: "block",
                                shapeRendering: "auto",
                            }}
                            width="20px"
                            height="20px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                fill="none"
                                stroke="#dadbdb"
                                strokeWidth="10"
                                r="35"
                                strokeDasharray="164.93361431346415 56.97787143782138"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    repeatCount="indefinite"
                                    dur="1.0526315789473684s"
                                    values="0 50 50;360 50 50"
                                    keyTimes="0;1"
                                />
                            </circle>
                        </svg>
                        : (paymentIntent.length > 0 ? <p className="flex flex-row items-center mx-auto text-center justify-center"><svg className=" mt-1 mr-1"
                            width="20px"
                            height="20px"
                            viewBox="0 0 133 133"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <g
                                id="check-group"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <circle
                                    id="filled-circle"
                                    fill="none"
                                    cx="66.5"
                                    cy="66.5"
                                    r="54.5"
                                />
                                <circle
                                    id="white-circle"
                                    fill="#none"
                                    cx="66.5"
                                    cy="66.5"
                                    r="55.5"
                                />
                                <circle
                                    id="outline"
                                    stroke="white"
                                    strokeWidth="10"
                                    cx="66.5"
                                    cy="66.5"
                                    r="54.5"
                                />
                                <polyline
                                    id="check"
                                    stroke="#FFFFFF"
                                    strokeWidth="10"
                                    points="41 70 56 85 92 49"
                                />
                            </g>
                        </svg>
                            Success!</p> : "Pay now")}
                </span>
            </button>
            
{/* <img width={300} src={StripeBanner}></img> */}
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            <div className=" mt-5">
                        <img width={120} src={StripeBanner}></img>
                    </div> 
        </form>
    );
}