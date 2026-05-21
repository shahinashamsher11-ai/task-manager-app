import { createContext, useContext, useState } from "react"
import { clearAuth, getAuth, storeAuth } from "./authStorage"

const authContext = createContext()
const useAuth = () => useContext(authContext)

const AuthProvider = ({ children }) => {
    const initAuth = getAuth()
    const initData = {
        isLogin: false,
        token: "",
        userName: ""
    }
    const [auth, setAuth] = useState(initAuth ? initAuth : initData)

    const logIn = (data) => {
        setAuth(data)
        storeAuth(data)
    }
    const logOut = () => {
        setAuth(initData)
        clearAuth()
    }

    return (
        <authContext.Provider value={{ logIn, logOut, auth }}>
            {children}
        </authContext.Provider>
    )
}
export default useAuth
export { AuthProvider }