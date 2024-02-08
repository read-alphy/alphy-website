import WelcomeForm from '../components/WelcomeForm'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import WelcomeRobot from '../img/welcome_robot.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function WelcomePageInfo({
  currentUser,
  userMetadata,
  setUserMetadata,
  setShowWelcomeForm,
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [onboarded, setOnboarded] = useState(false)
  const [onboardQueryCalled, setOnboardQueryCalled] = useState(false)

  useEffect(() => {
    if (onboardQueryCalled === false) {
      if (
        location.search.includes('?onboarding_form') === false ||
        localStorage.getItem('onboarding_form') === 'complete'
      ) {
        setOnboardQueryCalled(true)
        navigate('/')
      }
    }
  }, [])

  if (
    location.search.includes('?onboarding_form=complete') &&
    onboarded === false
  ) {
    setOnboarded(true)
    setOnboardQueryCalled(true)
    localStorage.setItem('onboarding_form', 'complete')
  }

  return (
    <div className="w-full mx-auto flex justify-center items-center">
      {onboarded === false && (
        <WelcomeForm
          currentUser={currentUser}
          userMetadata={userMetadata}
          setUserMetadata={setUserMetadata}
          setShowWelcomeForm={setShowWelcomeForm}
        />
      )}
      {onboarded === true && (
        <div>
          <div className="xl:hidden">
            <div className="mt-20 lg:mt-40 mx-auto w-full flex justify-center flex-col  items-center">
              <img
                className="mb-6 col-span-1 w-1/3   grayscale opacity-50  dark:opacity-70 "
                width={400}
                height={400}
                src={WelcomeRobot}
                alt="Welcome Robot"
              ></img>
              <div className="col-span-1 flex flex-col items-center text-center   px-4">
                <p className="text-2xl font-averta-semibold">
                  Glad to see you here!{' '}
                </p>
                <p className="text-lg text-zinc-700 dark:text-zinc-500 ">
                  Enjoy Alphy's features and let us know if you have any
                  questions.
                </p>

                <Link
                  to="/"
                  className="mt-6 rounded-lg border  bg-indigo-500 dark:bg-indigo-300  text-white px-2 py-3 w-[150px] flex flex-row  gap-4 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={
                      localStorage.getItem('theme') === 'light'
                        ? 'black'
                        : 'black'
                    }
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <p className="text-black">Home Page</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden xl:flex">
            <div className="mt-20 lg:mt-40 mx-auto w-full flex flex-row justify-center   items-center">
              <div className="col-span-1 flex flex-col   max-w-[450px] px-4">
                <p className="text-2xl font-averta-semibold">
                  Glad to see you here!{' '}
                </p>
                <p className="text-lg text-zinc-700 dark:text-zinc-500">
                  Enjoy Alphy's features and let us know if you have any
                  questions.
                </p>

                <Link
                  to="/"
                  className="mt-6 rounded-lg border bg-indigo-500 dark:bg-indigo-300 text-white px-2 py-3 w-[150px] flex flex-row  gap-4 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={
                      localStorage.getItem('theme') === 'light'
                        ? 'white'
                        : 'black'
                    }
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <p className="text-white dark:text-black">Home Page</p>
                </Link>
              </div>

              <img
                className="mb-6 col-span-1 w-1/4   grayscale opacity-50 dark:opacity-70  "
                width={400}
                height={400}
                src={WelcomeRobot}
                alt="Welcome Robot"
              ></img>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
