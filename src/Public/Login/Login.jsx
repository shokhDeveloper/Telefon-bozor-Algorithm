import { Col, Row , Form, Input, Typography, Button} from "antd"
import axios from "axios"
import { useFormik } from "formik"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Context } from "../../Context"
const {Title, Text} = Typography

export const Login = () => {
    const date = new Date()
    const navigator = useNavigate()
    const {toke, setToken, setUser, setAdmin} = useContext(Context)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (event) => {
            const jsons = await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: event,
                url: "http://localhost:9090/login"
            }).catch(error => console.log(error))
            const response = await jsons.data
            if(response){
                const {user, accessToken} = response
                if(accessToken !== null  || accessToken !== undefined){
                    if(user.email === "shohijahonmusinkulov@gmail.com" && user.name === "Shohijahon"){
                        setAdmin("admin")
                        setToken(accessToken)
                        setUser(user)   
                    }else{
                        setToken(accessToken)
                        setUser(user)   
                    
                    }
                }
                
            }
                
            
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email xato").required("Email kiritish majburiy"),
            password: Yup.string().min(3, "Minimum 3").max(10, "Maximum 10").required("Parol kiritish majburiy")
        })
    })
    return(
        <Row style={{minHeight: "100vh"}} justify="center" align={"middle"}>
            <Col>
                <Title>Login</Title>
                <Form onFinish={formik.handleSubmit}>
                    <Form.Item name={"email"} rules={[
                        {
                            type: "email"
                        },
                        
                    ]}>
                        <Input {...formik.getFieldProps("email")} placeholder="Email"></Input>
                        {formik.errors.email? <Text>{formik.errors.email}</Text>: false }
                    </Form.Item>
                    
                    <Form.Item name={"password"} rules={[
                        {
                            type: "password"
                        },
                        
                    ]}>
                        <Input.Password {...formik.getFieldProps("password")} placeholder="Parol"></Input.Password>
                        {formik.errors.password? <Text>{formik.errors.password}</Text>: false }
                    
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Yuborish</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}