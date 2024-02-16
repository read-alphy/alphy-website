import React, { createContext, useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const { currentUser } = useAuth()
    setCurrentUser(currentUser)
  }, [])

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  )
}
