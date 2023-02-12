import { createContext, useEffect, useState } from "react";

export const Context = createContext()

export const ContextProvider = ({children}) => {
    let parses_token = window.localStorage.getItem("token_shopping")
    const [token, setToken] = useState(parses_token !== null? parses_token: null)
    useEffect(() => {
        if(token !== null){
            window.localStorage.setItem("token_shopping", token)
        }
    },[token])
    const parses_user = window.localStorage.getItem("user_shopping")
    const [user, setUser] = useState(parses_user !== null? JSON.parse(parses_user): null)
    useEffect(() => {
        if(user !== null){
            window.localStorage.setItem("user_shopping", JSON.stringify(user))
        }
    },[user])
    const admin_parses = window.localStorage.getItem("admin")
    const [admin, setAdmin] = useState(admin_parses !== null? admin_parses : null)
    useEffect(() => {
        if(admin !== null){
            window.localStorage.setItem("admin", admin)
        }
    },[admin])
    const [gets, setGets] = useState(null)
    return(
        <Context.Provider value={{gets, setGets, admin, setAdmin,user, setUser, token, setToken}}>
            {children}
        </Context.Provider>
    )
}