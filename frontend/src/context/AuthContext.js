import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [wallet, setWallet] = useState(null)

  const login = (userData, accessToken, walletData) => {
    console.log("Context login called") // for debugging
    setUser(userData)
    setToken(accessToken)
    setWallet(walletData)
  }

  return (
    <AuthContext.Provider value={{ user, token, wallet, login }}>
      {children}
    </AuthContext.Provider>
  )
}
