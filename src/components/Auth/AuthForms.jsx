// File: AuthForms.jsx
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@material-tailwind/react'
import ReactLoading from 'react-loading'
import Google from '../../../public/img/google.png'
import { FormInput, SubmitButton, ErrorMessage } from './AuthComponents'
import { LogIn, UserPlus, Lock, Send, CheckCircle, Mail } from 'lucide-react'
import { useForm, FormProvider } from 'react-hook-form'

// Login Form Component
const LoginForm = ({ onSubmit, error }) => {
  const methods = useForm()
  const { handleSubmit, formState: { isSubmitting } } = methods

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          name="email"
          type="email"
          label="Email address"
          icon={<Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          required
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          icon={<Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          required
        />
        <SubmitButton isSubmitting={isSubmitting} label="Sign In" icon={<LogIn className="h-4 w-4 mr-2" />} />
        {error && <ErrorMessage message={error} />}
      </form>
    </FormProvider>
  )
}

// Register Form Component
const RegisterForm = ({ onSubmit, error }) => {
  const methods = useForm()
  const { handleSubmit, formState: { isSubmitting } } = methods

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          name="email"
          type="email"
          label="Email address"
          icon={<Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          required
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          icon={<Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          required
        />
        <FormInput
          name="repeatPassword"
          type="password"
          label="Confirm password"
          icon={<Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          required
        />
        <SubmitButton isSubmitting={isSubmitting} label="Create Account" icon={<UserPlus className="h-4 w-4 mr-2" />} />
        {error && <ErrorMessage message={error} />}
      </form>
    </FormProvider>
  )
}

// Reset Password Request Form
const ResetPasswordRequestForm = ({ onSubmit, email, currentUser, error, successMessage }) => {
  const methods = useForm({
    defaultValues: {
      email: currentUser ? currentUser.email : email || ''
    }
  })
  const { handleSubmit, formState: { isSubmitting } } = methods

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg ">
      <h2 className="text-xl mb-4 text-slate-700 dark:text-white quicksand font-bold">
        Reset Password
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 quicksand font-normal">
        Enter your email address and we will send you a link to reset your password.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormInput
            name="email"
            type="email"
            label="Email address"
            icon={<Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            required
          />
          <SubmitButton isSubmitting={isSubmitting} label="Send Reset Link" />
        </form>
      </FormProvider>
      {error && <ErrorMessage message={error} />}
      {successMessage && (
        <div className="flex items-center text-green-500 text-sm mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span className="quicksand font-medium text-sm">Email sent successfully</span>
        </div>
      )}
    </div>
  )
}

// Reset Password Confirmation Form
const ResetPasswordConfirmForm = ({ onSubmit, error }) => {
  const methods = useForm()
  const { handleSubmit, formState: { isSubmitting } } = methods

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl mb-4 text-slate-700 dark:text-white quicksand font-bold">
        Pick a New Password
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 quicksand font-normal">
        You are about to reset your password. Please make sure your new password is longer than 8 characters.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormInput
            name="password"
            type="password"
            label="Password"
            icon={<Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            required
          />
          <FormInput
            name="repeatPassword"
            type="password"
            label="Confirm password"
            icon={<Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            required
          />
          <SubmitButton isSubmitting={isSubmitting} label="Reset Password" icon={<Lock className="h-4 w-4 mr-2" />} />
        </form>
      </FormProvider>
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

// Success Confirmation
const SuccessConfirmation = ({ message, linkText, linkHref }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
    <div className="h-16 w-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-4">
      <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
    </div>
    <p className="text-center text-slate-700 dark:text-slate-200 quicksand font-medium mb-4">
      {message}
    </p>
    <Link 
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 quicksand font-bold transition-colors" 
      href={linkHref}
    >
      {linkText}
    </Link>
  </div>
)

// Verification Message Component
const VerificationMessage = ({ email, onResend, isSubmitting, successMessage }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg  max-w-md">
    <h2 className="text-xl mb-4 text-slate-700 dark:text-white quicksand font-bold">
      We sent a verification link to {email !== null ? email : 'your email'}!
    </h2>
    <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 quicksand font-normal">
      Please follow the link to complete your registration. If you didn't get the email, try again from the link below.
    </p>
    <Button
      onClick={onResend}
      className={`${
        isSubmitting ? 'opacity-50 pointer-events-none' : ''
      } bg-blue-500 hover:bg-blue-600 transition-colors quicksand font-medium px-4 py-2 rounded-lg flex items-center justify-center`}
    >
      {isSubmitting ? (
        <ReactLoading type="spin" width={17} height={17} color="#ffffff" />
      ) : (
        <>
          <Mail className="h-4 w-4 mr-2" />
          <span>Resend Link</span>
        </>
      )}
    </Button>
    {successMessage && (
      <div className="flex items-center text-green-500 text-sm mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
        <CheckCircle className="h-4 w-4 mr-2" />
        <span className="quicksand font-medium">Done! Please check your inbox.</span>
      </div>
    )}
  </div>
)

// Social Login Button
const SocialLoginButton = ({ onClick }) => (
  <button
    className="py-2 px-4 w-full border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    onClick={onClick}
  >
    <div className="flex items-center justify-center">
      <Image src={Google} width={20} alt="google logo" height={20} />
      <span className="ml-3 text-slate-700 dark:text-slate-300 quicksand font-medium">
        Continue with Google
      </span>
    </div>
  </button>
)

// Auth Links
const AuthLinks = ({ isRegister }) => (
  <div className="mt-6 text-center">
    {isRegister ? (
      <p className="text-slate-600 dark:text-slate-300 text-sm quicksand font-medium">
        Already have an account?{' '}
        <Link href="/u/login" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 quicksand font-bold transition-colors">
          Sign in here
        </Link>
      </p>
    ) : (
      <p className="text-slate-600 dark:text-slate-300 text-sm quicksand font-medium">
        Don't have an account?{' '}
        <Link href="/u/register" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 quicksand font-bold transition-colors">
          Create account
        </Link>
      </p>
    )}
  </div>
)

export {
  LoginForm,
  RegisterForm,
  ResetPasswordRequestForm,
  ResetPasswordConfirmForm,
  SuccessConfirmation,
  VerificationMessage,
  SocialLoginButton,
  AuthLinks
}