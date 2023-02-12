import { Col, Row, Typography } from "antd"
import { Link } from "react-router-dom"
const {Title} = Typography
export const Home_Page = () => {
    return(
        <Row justify={"center"} align="middle" style={{minHeight: "90vh"}}>
            <Col>
                <Title>Telefon bozorga hush kelibsiz</Title>
                <Link style={{color: "#000", fontSize: "20px"}} to={"/register"}>Dasturga kirish uchun ruyhattan o'ting</Link>
            </Col>
        </Row>
    )
}