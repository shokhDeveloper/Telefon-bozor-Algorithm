import { useContext } from "react"
import { Context } from "../../Context"
import { Layout } from "../../Layout"
import { Admin } from "../Admin"
import { Client } from "../Client"
export const Home = () => {
    const {admin} = useContext(Context)
    console.log(admin)
    return(
        <Layout>
            {admin !== null? <Admin/>: <Client/> }
        </Layout>
    )
}