import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {useRouter} from 'next/router'
import Link from 'next/link'

import { Button } from '@material-tailwind/react'
import ReactLoading from 'react-loading'
import Google from '../../../public/img/google.png'
import Image from 'next/image'

const AuthInfo = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  
  const router = useRouter()

  
  const [repeatPassword, setRepeatPassword] = useState('')
  const [verificationMessage, setVerificationMessage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const resetPassword =router.asPath.includes('/u/resetpassword')


  const isRegister =router.asPath.includes('/u/register')
  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const oobCode = router.query.oobCode


  useEffect(() => {
    /* 		if (window.location.href=="http://localhost:3000/u/resetpassword" && resetPassword ===false){
					router.push('/u/login')
				} */
    if (auth.currentUser && resetPassword === false) {
      router.push('/')
    }
  })

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleRepeatPasswordChange = event => {
    setRepeatPassword(event.target.value)
  }

  const handleRegisterWithEmail = event => {
    event.preventDefault()
    setIsSubmitting(true)

    auth
      .checkIfUserExists(email)
      .then(signInMethods => {
        if (signInMethods.length > 0) {
          setError('An account with this email already exists.')
          setIsSubmitting(false)
          return // Stop executing the rest of the code
        }

        if (repeatPassword !== password) {
          setError('Passwords do not match.')
          setIsSubmitting(false)
        } else if (password.length < 8) {
          setError('Password must be at least 8 characters long.')
          setIsSubmitting(false)
        } else {
          setTimeout(() => {
            auth
              .registerWithEmail(email, password)
              .then(() => {
                setVerificationMessage(true)
                setIsSubmitting(false)
              })
              .catch(error => {
                console.log(error)
                setIsSubmitting(false)
              })
          }, 1000)
        }
      })
      .catch(error => {
        console.log(error)
        setIsSubmitting(false)
      })
  }

  const handleLoginWithEmail = event => {
    //setIsSubmitting(true)
    event.preventDefault()
    console.log('logging in')
    auth
      .loginWithEmail(email, password)
      .then(result => {
        if (result === 'verification error') {
          setError('Please verify your email before logging in.')
          setVerificationMessage(true)
        } else if (result === 'user not found') {
          setError('Oops! Incorrect email or password.')
        } else {
          localStorage.setItem('logged in', 'true')
          
          router.push('/myhub')
          setIsSubmitting(false)
        }
      })
      .catch(error => {
        console.log(error)
        if (
          error.message == 'Firebase: Error (auth/user-not-found).' ||
          error.message == 'Firebase: Error (auth/wrong-password).'
        ) {
          setError('Oops! Incorrect email or password.')
        } else {
          setError(error.message)
        }

        console.log(error)
      })
  }

  const handleLoginWithGoogle = e => {
    e.preventDefault()
    auth
      .loginWithGoogle()
      .then(event => {
        localStorage.setItem('logged in', 'true')
        if (event.user) {
          const createdAt = event.user.metadata.createdAt
          const lastLogin = event.user.metadata.lastLoginAt
          if (lastLogin - createdAt < 5000) {
            console.log('isNewUser')
            router.push('/u/welcome/?onboarding_form')
          }
        } else {
          router.push('/')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const sendResetPasswordMail = event => {
    setIsSubmitting(true)
    event.preventDefault()

    auth
      .resetPassword(email)

      .then(result => {
        setIsSubmitting(false)
        setSuccessMessage(true)
        localStorage.setItem('resetPassword', 'false')
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Firebase: Error (auth/user-not-found).') {
          setError('No user found with this email address.')
        }
        setIsSubmitting(false)
      })
  }

  const handlePasswordResetConfirmation = event => {
    setIsSubmitting(true)
    event.preventDefault()

    if (repeatPassword !== password) {
      setError('Passwords do not match.')
      setIsSubmitting(false)
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setIsSubmitting(false)
    } else {
      auth
        .handlePasswordReset(oobCode, password)
        .then(result => {
          setSuccessMessage(true)
          setIsSubmitting(false)
        })
        .catch(error => {
          if (error.message == 'Firebase: Error (auth/invalid-action-code).') {
            setError('Invalid or expired link. Please request another link.')
          } else {
            setError(error.message)
          }
          setIsSubmitting(false)
        })
    }
  }

  const handleResendVerificationEmail = event => {
    setIsSubmitting(true)
    event.preventDefault()

    auth
      .resendEmailVerification()
      .then(result => {
        setSuccessMessage(true)
        setIsSubmitting(false)
      })
      .catch(error => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="flex flex-col sm:items-center sm:justify-center h-screen mt-20 sm:mt-10 mx-auto items-center w-[300px]">
      {verificationMessage == false ? (
        resetPassword === false ? (
          <div className="mb-20 w-[300px]">
            <div>
              <h2 className="text-xl mb-8 text-zinc-700 dark:text-zinc-300 font-averta-semibold">
                {isRegister ? 'Create an account' : 'Login'}{' '}
              </h2>

              <form
                onSubmit={
                  isRegister ? handleRegisterWithEmail : handleLoginWithEmail
                }
              >
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor dark:peer-focus:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-averta-semibold"
                  >
                    Email address
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={handlePasswordChange}
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor peer-focus:dark:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-averta-semibold"
                  >
                    Password
                  </label>
                </div>
                {isRegister ? (
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      onChange={handleRepeatPasswordChange}
                      type="password"
                      name="repeat_password"
                      id="floating_repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor peer-focus:dark:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-averta-semibold"
                    >
                      Confirm password
                    </label>
                  </div>
                ) : null}
                <div className="grid md:grid-cols-2 md:gap-6"></div>

                <Button
                  type="submit"
                  className={`${
                    isSubmitting ? 'opacity-50 pointer-events-none' : ''
                  } bg-greenColor font-averta-semibold`}
                >
                  {' '}
                  {isSubmitting ? (
                    <ReactLoading
                      type="spin"
                      width={17}
                      height={17}
                      color="#ffffff"
                    />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </form>
              {error && (
                <div>
                  {' '}
                  <div className="text-red-500 text-sm mb-8 mt-5">{error}</div>
                </div>
              )}
              <div className="mt-4">
                {isRegister === false ? (
                  <div className="text-zinc-600 dark:text-zinc-300 text-sm">
                    <p>
                      <Link
                        href="/u/resetpassword"
                        className="underline cursor-pointer font-averta-semibold"
                      >
                        {' '}
                        Forgot your password?
                      </Link>
                    </p>{' '}
                  </div>
                ) : null}
                {isRegister ? (
                  <div className="mt-6">
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm font-averta-semibold">
                      {' '}
                      Already have an account? Login{' '}
                      <Link
                        href="/u/login"
                        className="text-greenColor font-averta-semibold"
                      >
                        here.
                      </Link>
                    </p>{' '}
                  </div>
                ) : (
                  <div className="mt-6">
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm font-averta-semibold">
                      Don't have an account?{' '}
                      <Link
                        href="/u/register"
                        className="text-greenColor font-averta-semibold"
                      >
                        Register now.
                      </Link>
                    </p>{' '}
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className="flex items-center mt-10 mb-10">
                <div className="border-b border-gray-300 w-[200px] mr-3"></div>
                <span className="text-sm text-gray-400 font-averta-semibold">
                  OR
                </span>
                <div className="border-b border-gray-300 w-[200px] ml-3 "></div>
              </div>

              <button
                className="py-3 px-4  w-full border border-gray-500 rounded focus:outline-none focus:shadow-outline "
                onClick={handleLoginWithGoogle}
              >
                <div className="flex flex-rows	">
                  <Image src={Google} width={30} alt= 'google logo' height={30} 
                  ></Image>
                  <span className=" ml-4 font-extral	text-zinc-700 dark:text-zinc-300 font-averta-semibold">
                    Continue with Google
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : oobCode === null || oobCode === undefined ? (
          <div className="mb-20 w-[300px]">
            <h2 className="text-xl mb-8 text-zinc-700 dark:text-zinc-700 font-averta-semibold">
              Reset Password{' '}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-10 font-averta-semibold">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <form onSubmit={sendResetPasswordMail}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  value={auth.currentUser ? auth.currentUser.email : email}
                  onChange={handleEmailChange}
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor dark:peer-focus:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-averta-semibold"
                >
                  Email address
                </label>
              </div>
              <Button
                type="submit"
                className={`${
                  isSubmitting ? 'opacity-50 pointer-events-none' : ''
                } bg-greenColor font-averta-semibold`}
              >
                {' '}
                {isSubmitting ? (
                  <ReactLoading
                    type="spin"
                    width={17}
                    height={17}
                    color="#ffffff"
                  />
                ) : (
                  <span>Send Link</span>
                )}
              </Button>
            </form>
            {error && (
              <div className="text-red-500 text-sm mb-8 mt-5 font-averta-semibold">
                {error}{' '}
              </div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm mb-8 mt-5 font-averta-semibold">
                Email sent successfully
              </div>
            )}
          </div>
        ) : (
          <div className="mb-20 w-[300px]">
            {successMessage === false ? (
              <div>
                <h2 className="text-xl mb-8 font-averta-semibold">
                  Pick a New Password{' '}
                </h2>
                <p className="text-sm text-zinc-600 mb-10 dark:text-zinc-300 font-averta-semibold">
                  You are about to reset your password. Please make sure your
                  new password is longer than 8 characters.
                </p>
                <form onSubmit={handlePasswordResetConfirmation}>
                  {/* 					<div className="relative z-0 w-full mb-6 group">
						<input value={email} onChange={handleEmailChange} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer" placeholder=" " required />
						<label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor peer-focus:dark:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
					</div> */}

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      onChange={handlePasswordChange}
                      type="password"
                      name="floating_password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor peer-focus:dark:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-averta-semibold"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      onChange={handleRepeatPasswordChange}
                      type="password"
                      name="repeat_password"
                      id="floating_repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-greenColor focus:outline-none focus:ring-0 focus:border-greenColor peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-greenColor peer-focus:dark:text-greenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-averta-semibold"
                    >
                      Confirm password
                    </label>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mb-8 mt-5">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className={`${
                      isSubmitting ? 'opacity-50 pointer-events-none' : ''
                    } bg-greenColor`}
                  >
                    {' '}
                    {isSubmitting ? (
                      <ReactLoading
                        type="spin"
                        width={17}
                        height={17}
                        color="#ffffff"
                      />
                    ) : (
                      <span className="text-zinc-700 dark:text-zinc-700 font-averta-semibold">
                        Reset Password
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-md mb-8 mt-5 items-center">
                <svg
                  className="items-center mx-auto text-green-500"
                  width={60}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="mx-auto text-center mt-4 text-zinc-600 font-averta-semibold">
                  Password reset successfully.{' '}
                  <Link
                    className="underline font-averta-semibold"
                    href="/u/login"
                  >
                    {' '}
                    Login
                  </Link>{' '}
                  to continue.
                </p>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="mb-20 w-[300px]">
          <h2 className="text-xl mb-8 font-averta-semibold">
            We sent a verification link to{' '}
            {email !== null ? email : 'your email'}!
          </h2>
          <p className="text-sm text-zinc-600 mb-10 font-averta-semibold">
            Please follow the link to complete your registration. If you didn't
            get the email, try again from the link below.
          </p>
          <Button
            onClick={handleResendVerificationEmail}
            className={`${
              isSubmitting ? 'opacity-50 pointer-events-none' : ''
            } bg-greenColor font-averta-semibold`}
          >
            {' '}
            {isSubmitting ? (
              <ReactLoading
                type="spin"
                width={17}
                height={17}
                color="#ffffff"
              />
            ) : (
              <span>Resend Link</span>
            )}
          </Button>
          {successMessage && (
            <div className="text-zinc-500 text-sm mb-8 mt-5 font-averta-semibold">
              Done! Please check your inbox.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AuthInfo
