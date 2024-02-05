import { useState, useEffect } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { firebaseApp } from '../helper/firebase' // assuming you have initialized Firebase in a separate file

const auth = getAuth(firebaseApp)

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.emailVerified) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })

    return unsubscribe
  }, [])

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      userCredential => {
        const user = userCredential.user

        if (user !== null) {
          // Check if the user's email is verified
          if (user.emailVerified) {
            // User is logged in and email is verified
            return 'success'
          } else {
            // User's email is not verified
            return 'verification error'
          }
        } else {
          return 'user not found'
        }
      }
    )
  }

  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        // Send email verification
        sendEmailVerification(user)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleVerifyEmail = oobCode => {
    return applyActionCode(auth, oobCode)
  }

  const resendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser)
  }

  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email)
  }

  const handlePasswordReset = (code, password) => {
    return confirmPasswordReset(auth, code, password)
  }
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const checkIfUserExists = email => {
    return fetchSignInMethodsForEmail(auth, email)
  }

  const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const logout = () => {
    return signOut(auth)
  }

  return {
    currentUser,
    loginWithEmail,
    loginWithGoogle,
    loginWithTwitter,
    logout,
    registerWithEmail,
    resetPassword,
    handlePasswordReset,
    resendEmailVerification,
    handleVerifyEmail,
    checkIfUserExists,
  }
}

export { useAuth }
