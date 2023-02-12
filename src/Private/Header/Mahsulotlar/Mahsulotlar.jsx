import { Row, Col, Typography } from "antd"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import { All, Iphone, Xiaomi } from "../../../pages"
import { Samsung } from "../../../pages/Samsung/Samsung"
const {Title}  =Typography
export const Mahsulotlar = () => { 
    const [data, setData] = useState([])
    const getCategory = useCallback(() => {
        axios.get("http://localhost:9090/category").then((response) => setData(response.data) ).catch((error) => console.log(error))        
    },[])
    useEffect(() => {
        getCategory()
    },[getCategory])
    return(
        <>
          <Row style={{width: "100%", }} justify="center">
            {data?.length?
                <Col style={{width: "30%",  margin: "0 auto", display: "flex", justifyContent: "space-between"}}>
                        <NavLink to={"all"}>Hammasi</NavLink>
                    {data.map((item) => (
                        <NavLink to={item.name}>{item.name}</NavLink>
                    ))}
                </Col>
            :<Title>Hali category lar yuq</Title>}            
        </Row>
        <Routes>
            <Route index element={<Iphone/>}/>
            <Route path="/Apple" element={<Iphone/>}/>
            <Route path="/Samsung" element={<Samsung/>}/>
            <Route path="/Xiaomi" element={<Xiaomi/>}/>
            <Route path="/all" element={<All/>}/>
            <Route path="/Vivo" element={<><h1>Vivo</h1></>}/>
        </Routes>
        </>
      
    )
}