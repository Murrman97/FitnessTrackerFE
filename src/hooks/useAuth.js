import { useContext } from 'react'
import AuthContext from '../AuthContext'

// const context = useContext(AuthContext)

const useAuth = () => {
  const { user, setUser, token, setToken, loggedIn, setLoggedIn,  } = useContext(AuthContext)

  return {
    user,
    setUser,
    token,
    setToken,
    loggedIn,
    setLoggedIn
  }
}


export default useAuth