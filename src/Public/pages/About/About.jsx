import "./About.css"
import { Col, Row, Typography, Image } from "antd"
import { NavLink } from "react-router-dom"
import Logo from "../../../assets/images/iphone_14_PNG20.png"
const {Title, Text} = Typography
export const About = () => {
    return(
        <div className="container">
            <Row justify={"space-around"} style={{minHeight: "90vh"}} align="middle">
            <Col>   
                <Image src={Logo} width={400}/>
            </Col>
            <Col style={{width: "50%"}}>
                <Title>
                    Dastur haqida
                </Title>
                <Text style={{fontSize: "20px"}}>
                    Dasturda Admin tizimi mavjud bo'lib bu yerda siz dasturda sotiladigan mahsulot va telefon larga yana mahsulot qushishingiz mumkin va albatta dastur nomini o'zgartira olasiz. Agarda shunchaki mijoz sifatida kirsangiz e'lon qushish va albatta mahsulotlardan sotib olishingiz mumkin bo'ladi. Dasturda admin faqa dasturni yaratuvchisi hisoblanadi va siz o'z qo'shgan tovarlaringizni keyinchalik o'zgartira olasiz va albatta yangilay olasiz. Dasturni ishlatib ko'ring va albatta yoqsa keyinchalik postlarda fikringizni qoldiring. 
                </Text>
                <NavLink className={"register"} to={"/register"}>Dasturga kirish uchun ro'yhattan o'ting</NavLink>
            </Col>
        </Row>
        </div>
    )
}