import { Button, Col, Form, Input, Row, Typography } from "antd"
import { useFormik } from "formik"
import { useState } from "react"
import { Layout } from "../../Layout"
import { Modal } from "../../Modal"
import * as Yup from "yup"
import axios from "axios"
import { Renders } from "./Renders"
const {Text} = Typography
export const Admin = () => {
    const [modal, setModal] = useState(!true)
    const date = new Date()
    const formik = useFormik({
        initialValues : {
            name: "",
            action: ""     
        },
        onSubmit: async (event) => {
            const jsons = await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Create-At_categorys` },
                url: "http://localhost:9090/category"
            }).catch((error) => {
                console.log(error)
            })
            if(jsons.status === 201){
                setModal(!modal)
            }
            let response = await jsons.data
            console.log(response)
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Category name yozish majburiy"),
            action: Yup.string().required("Category action yozish majburiy")
        }) 
    })
    console.log(formik.errors)
    return(
        <Layout>
            <Row>
                <Col>
                    <Button type="primary" onClick={() => setModal(!modal)}>Category qushish</Button>
                </Col>
            </Row>
            <Modal modal={modal} setModal={setModal} title="Category qushish">
                <Form onFinish={formik.handleSubmit}>
                    <Form.Item rules={[
                        {
                            type: "text"
                        }
                    ]}>
                        <Input {...formik.getFieldProps("name")} placeholder="Category ismi"></Input>
                        {formik.errors.name? <Text>{formik.errors.name}</Text>: false}
                    </Form.Item>
                    <Form.Item rules={[
                        {
                            type: "text"
                        }
                    ]}>
                        <Input {...formik.getFieldProps("action")} placeholder="Category action"></Input>
                        {formik.errors.action? <Text>{formik.errors.action}</Text>: false}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">Yuborish</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Row justify={"center"} align="middle">
                <Col>
                    <Renders/>
                </Col>
            </Row>
        </Layout>
    )
}