import { Button, Col, Row, Typography } from "antd"
import { useContext, useEffect, useRef, useState } from "react"
import { Mahsulotlar } from "../../Mahsulotlar"
import { Modal } from "../../../../Modal"
import { Formik, useFormik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import axios from "axios"
import { Context } from "../../../../Context/Context"
const {Title} = Typography
export const Home_Page = () => {
    const date = new Date()
    const [modal, setModal] = useState(!true)
    const [data, setData] = useState([])
    const {gets} = useContext(Context)
    const category = useRef()
    const validationSchema = Yup.object({
        name: Yup.string().required("Ism majburiy"),
        price: Yup.string().required("Narx majburiy"),
        image:Yup.string().required("Rasm majburiy"),
        category: Yup.string().required("Category majburiy")
    })
    const initialValues = {
        name: "",
        price: "",
        image: "",
        category: ""
    }
    const handleSubmit =  async (event) => {
        const jsons = await fetch("http://localhost:9090/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Create-At_product`})
        }).catch((error) => console.log(error))
        if(jsons.status === 201){
            setModal(!modal)
            gets()
        }
        let response = await jsons.json()
        console.log(response)
       
    }
    useEffect(() => {
        axios.get("http://localhost:9090/category").then((response) => setData(response.data)).catch(error => console.log(error))
    },[])
    return(
        <Row  style={{padding: "1rem", width: "100%"}}>
            <Col style={{width: "100%", textAlign: "center"}}>
                <Title>
                    Barcha mahsulotlar
                </Title>
                <Button type="primary" onClick={() => setModal(!modal)} style={{margin: "1rem"}}>Mahsulot qushish</Button>
                <Mahsulotlar/>
                <Modal modal={modal} setModal={setModal} title={"Mahsulot qushing"}>
                    <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                        <Form>
                            <Field placeholder="Ism" name="name" type="text"></Field>
                            <ErrorMessage name="name"/>
                            <Field placeholder="price" name="price" type="number"></Field>
                            <ErrorMessage name="price"/>
                            <Field placeholder="url" name="image" type="url"></Field>
                            <ErrorMessage name="url"/>
                            <Field  defaultValues="Category" as="select" name="category" >
                                <option value="Category" selected disabled>Category</option>
                                {data?.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="category"/>
                            <button type="submit">Qushish</button>
                        </Form>
                    </Formik>
                </Modal>
            </Col>
        </Row>
    )
}