import { ShoppingCartOutlined } from "@ant-design/icons/lib/icons"
import { Avatar, Badge, Button, Col, Image, Layout, Row , Space, Typography} from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import { useCart } from "react-use-cart"
import { Context } from "../../Context"
import { Modal } from "../../Modal"
import { ParentModal } from "../../ParentModal"
import { Home_Page } from "./pages"
const {Header: AntdHeader} = Layout
const {Title, Text} = Typography
export const Header = () => {
    const [modal, setModal] = useState(!true)
    const cart = useCart()
    const {user} = useContext(Context)
    console.log(cart)
    const handleClick = () => {
        setModal(!modal)
    }
    useEffect(() => {
        if(modal === true){
            window.addEventListener("keyup", (event) => {
                if(event.keyCode){
                    setModal(!modal)
                }else{
                    console.log(false)
                }
            })
            
        }        
    },[modal])
    console.log(cart.items)
    const handleOrder = async () => {
        console.log("ishladi")
        const jsons = await axios({
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            data:{
                ...user,
                totalPrice:cart.items
            },
            url: "http://localhost:9090/order"
        }).catch(error => console.log(error)) 
        let response = await jsons.data
        console.log(response)
    }
    return(
    <>
    <AntdHeader style={{background: "#fff", borderBottom: "1px solid #222"}}>
        {(function(){
            setTimeout(() => {
                // setModal(false)
            }, 1000)
        } ())}
        <Row justify={"space-between"}>
            <Col>
                
                <Title>Telefon Bozor</Title>
            </Col>
            <Col style={{width: "20%", display: "flex", justifyContent: "space-between"}}>
                <NavLink to={"home"}>
                        Home
                </NavLink>
                <NavLink to={"/about"}>About</NavLink>
                <Space style={{width: "30%", display: "flex", justifyContent: "space-between"}}>
                    <Badge count={cart.totalItems}>
                        <Avatar onClick={handleClick}><ShoppingCartOutlined/></Avatar>
                    </Badge>
                    <Avatar>
                    {user.name.charAt(0) + user.lastname.charAt(0)}
                    </Avatar>
                </Space>
            </Col>
                <ParentModal modal={modal} setModal={setModal} title="Sotib olinganlar">
                    {cart?.items?.length? 
                    <Row justify={"center"} align="middle">
                        {cart.items.map((item) => (
                            <>
                                <Col style={{margin: "1rem 0rem"}}>
                                <Image src={item.image}></Image>
                                <Text>{item.name}</Text>
                                <div>
                                    <Button onClick={() => cart.removeItem(item.id) } type="primary">O'chirish</Button>
                                    <Button onClick={() => cart.updateItemQuantity(item.id, item.quantity+1)}>Yana qushish</Button>
                                    {item.quantity > 1? <><Button type="primary" onClick={() => cart.updateItemQuantity(item.id, item.quantity-1 )}>Bitasini olib tashlash</Button> 
                                    <Title>
                                        {item.quantity}
                                    </Title>
                                    </>: false}
                                </div>
                                <div style={{display: "block"}}>
                                <Button type="primary" onClick={() => cart.removeItem(item.id)}>
                                    Butunlay bu mahsulotni o'chirish
                                </Button>
                                </div>
                            </Col>
                            </>
                        ))}
                        <Col style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                            <Button type="primary" onClick={() => cart.emptyCart()}>Cleear cart</Button>
                            <Button type="primary" onClick={() => handleOrder()}>Hisoblash</Button>
                        </Col>
                    <Title>Jami summa {cart.cartTotal}</Title>
                            
                    </Row>
                    : <Title>Hali hech narsa sotib olinmagan</Title>}
                </ParentModal>
            {/* <Modal modal={modal} setModal={setModal} title={"Hush kelibsiz hurmatli mijoz"}/> */}
        </Row>
    </AntdHeader>
    <div style={{width: "100%"}}>
    <Routes>
        <Route path="/home/*" element={<Home_Page/>}/>
    </Routes>
    </div>
    </>
    
    )
}