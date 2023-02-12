import "./Header.css"
import { Col, Layout, Row, Typography } from "antd";
import { NavLink, Outlet } from "react-router-dom";
const {Title} = Typography
const {Header: AntdHeader} = Layout

export const Header = () => {
    return(
        <>
        <AntdHeader style={{backgroundColor: "#fff"}}>
            <Row justify={"space-between"}>
                <Col>
                    <Title>Logo</Title>
                </Col>
                <Col style={{width: "20%", display: "flex", justifyContent: "space-around" }}>
                    <NavLink className={(params) => params.isActive? "active": false } to={"home"} style={{fontSize: "20px"}}>   
                        Home
                    </NavLink>
                    <NavLink className  ={(params) => params.isActive? "active": false } to={"about"} style={{ fontSize: "20px"}}>About</NavLink>
                </Col>
            </Row>
        </AntdHeader>   
        <Outlet/>
        </>
    )
}