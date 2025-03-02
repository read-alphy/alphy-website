// File: AuthInfo.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  LoginForm, 
  RegisterForm, 
  ResetPasswordRequestForm, 
  ResetPasswordConfirmForm,
  VerificationMessage,
  SuccessConfirmation,
  SocialLoginButton,
  AuthLinks
} from './AuthForms'

// Custom hook for form handling
const useAuthForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return {
    values,
    error,
    isSubmitting,
    successMessage,
    setValues,
    setError,
    setIsSubmitting,
    setSuccessMessage,
    handleChange
  }
}

// Main AuthInfo Component
const AuthInfo = () => {
  const auth = useAuth()
  const router = useRouter()
  const [verificationMessage, setVerificationMessage] = useState(false)
  
  const {
    values: { email = '', password = '', repeatPassword = '' },
    error,
    isSubmitting,
    successMessage,
    setError,
    setIsSubmitting,
    setSuccessMessage,
    setValues,
    handleChange
  } = useAuthForm()

  const isRegister = router.asPath.includes('/u/register')
  const resetPassword = router.asPath.includes('/u/resetpassword')
  const oobCode = router.query.oobCode

  useEffect(() => {
    if (auth.currentUser && !resetPassword) {
      router.push('/')
    }
  }, [auth.currentUser, resetPassword, router])

  // Validation functions
  const validatePasswords = (e) => {
    console.log(e.repeatPassword, e.password)
    if (e.repeatPassword !== e.password) {
      setError('Passwords do not match.')
      return false
    } 
    if (e.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return false
    }
    return true
  }

  // Form handlers
  const handleRegisterWithEmail = async (e) => {
    setIsSubmitting(true)
    
    try {
      // Check if user exists
      console.log(e)
      const signInMethods = await auth.checkIfUserExists(e.email)

      if (signInMethods.length > 0) {
        setError('An account with this email already exists.')
        setIsSubmitting(false)
        return
      }
      // Validate passwords
      if (!validatePasswords(e)) {
        console.log('passwords do not match')
        setIsSubmitting(false)
        return
      }
      console.log('registering user')
      // Register user
      await auth.registerWithEmail(e.email, e.password)
      setVerificationMessage(true)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLoginWithEmail = async (e) => {
    
    setIsSubmitting(true)

    try {
      const result = await auth.loginWithEmail(e.email, e.password)
      
      if (result === 'verification error') {
        setError('Please verify your email before logging in.')
        setVerificationMessage(true)
      } else if (result === 'user not found') {
        setError('Oops! Incorrect email or password.')
      } else {
        localStorage.setItem('logged in', 'true')
        router.push('/myhub')
      }
    } catch (error) {
      console.log(error)
      if (
        error.message === 'Firebase: Error (auth/user-not-found).' ||
        error.message === 'Firebase: Error (auth/wrong-password).'
      ) {
        setError('Oops! Incorrect email or password.')
      } else {
        setError(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault()
    
    try {
      const event = await auth.loginWithGoogle()
      localStorage.setItem('logged in', 'true')
      
      if (event.user) {
        const createdAt = event.user.metadata.createdAt
        const lastLogin = event.user.metadata.lastLoginAt
        
        if (lastLogin - createdAt < 5000) {
          router.push('/u/welcome/?onboarding_form')
        } else {
          router.push('/')
        }
      } else {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const sendResetPasswordMail = async (e) => {
    
    setIsSubmitting(true)

    try {
      await auth.resetPassword(e.email)
      setSuccessMessage(true)
      localStorage.setItem('resetPassword', 'false')
    } catch (error) {
      console.log(error)
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        setError('No user found with this email address.')
      } else {
        setError(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordResetConfirmation = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!validatePasswords()) {
      setIsSubmitting(false)
      return
    }

    try {
      await auth.handlePasswordReset(oobCode, password)
      setSuccessMessage(true)
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-action-code).') {
        setError('Invalid or expired link. Please request another link.')
      } else {
        setError(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendVerificationEmail = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await auth.resendEmailVerification()
      setSuccessMessage(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine which form to render
  const renderAuthForm = () => {
    // Already verified - show verification message
    if (verificationMessage) {
      return (
        <VerificationMessage
          email={email}
          onResend={handleResendVerificationEmail}
          isSubmitting={isSubmitting}
          successMessage={successMessage}
        />
      )
    }

    // Not on reset password path
    if (!resetPassword) {
      return (
        <div className="mb-20 w-[300px]">
          <div>
            <h2 className="text-xl mb-8 text-slate-700 dark:text-slate-300 quicksand font-bold">
              {isRegister ? 'Create an account' : 'Login'}
            </h2>

            {isRegister ? (
              <RegisterForm
                onSubmit={(e) => handleRegisterWithEmail(e)}
                onChange={handleChange}
                isSubmitting={isSubmitting}
                error={error}
              />
            ) : (
              <LoginForm
                onSubmit={handleLoginWithEmail}
                onChange={handleChange}
                isSubmitting={isSubmitting}
                error={error}
              />
            )}

            <div className="mt-4">
              {!isRegister && (
                <div className="text-slate-600 dark:text-slate-300 text-sm">
                  <p>
                    <Link
                      href="/u/resetpassword"
                      className="underline cursor-pointer quicksand font-semibold"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              )}
              
            </div>
          </div>

          {/* Social login section */}
          <div>
            <div className="flex items-center mt-10 mb-10">
              <div className="border-b border-gray-300 w-[200px] mr-3"></div>
              <span className="text-sm text-gray-400 quicksand font-semibold">
                OR
              </span>
              <div className="border-b border-gray-300 w-[200px] ml-3"></div>
            </div>
            <SocialLoginButton onClick={handleLoginWithGoogle} />
          </div>
          <AuthLinks isRegister={isRegister} />
        </div>
        
      )
    }

    // Reset password flow
    if (!oobCode) {
      return (
        <div className="mb-20 w-[300px]">
          <ResetPasswordRequestForm
            onSubmit={sendResetPasswordMail}
            onChange={handleChange}
            isSubmitting={isSubmitting}
            error={error}
            email={email}
            currentUser={auth.currentUser}
            successMessage={successMessage}
          />
        </div>
      )
    }

    // Reset password with code
    if (!successMessage) {
      return (
        <div className="mb-20 w-[300px]">
          <ResetPasswordConfirmForm
            onSubmit={handlePasswordResetConfirmation}
            onChange={handleChange}
            isSubmitting={isSubmitting}
            error={error}
          />
        </div>
      )
    }

    // Password reset success
    return (
      <div className="mb-20 w-[300px]">
        <SuccessConfirmation
          message="Password reset successfully."
          linkText="Login"
          linkHref="/u/login"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col  h-screen mt-20 sm:mt-10 mx-auto items-center w-[300px]">
      {renderAuthForm()}
    </div>
  )
}

export { useAuthForm }
export default AuthInfo