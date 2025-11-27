import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { URL } from '../url'
import { UserContext } from './UserContext'
export default function UserContextProvider({children}) {
    const [user, setUser] = useState (null)

    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await axios.get(`${URL}/api/auth/me`, {withCredentials: true})
          setUser (res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    }, [])
    
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}
