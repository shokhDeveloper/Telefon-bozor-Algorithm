import { Button, Col, Image, Row, Typography } from "antd"
import axios from "axios"
import { ErrorMessage, Form,  Field, Formik } from "formik"
import { useCallback, useEffect, useState } from "react"
import { Modal } from "../../Modal"
import * as Yup from "yup";
const {Title} = Typography
export const Samsung = () => {
    const date = new Date()
    const [data, setData] = useState([])
    const [modal, setModal] = useState(!true)
    const [category, setCategory] = useState([])
    const [number, setNumber] = useState(0)  
    const [deleteModal, setDeleteModal] = useState(!true)
    const initialValues = {
        name: "",
        price: "",
        image: "",
        category: "Category"
    
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("name majburiy"),
        price: Yup.string().required("narx majburiy"),
        image: Yup.string().required("Image majburiy"),
        category: Yup.string().required("Category majburiy")
    })
    const getProduct = useCallback( async() => {
        const jsons = await axios({
            method: "GET",
           url: "http://localhost:9090/product?category=Samsung" 
        }).catch((error) => console.log(error))
        const response = await jsons.data
        setData(response)
    },[])
    const handleSub =  async(event) => {
        if(number !== 0){
            const jsons = await axios.put(`http://localhost:9090/product/${number}`, {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At`})
            let shart = jsons.status === 200 ? setModal(!modal): false
            const response = await jsons.data
            console.log(response)
            getProduct()
        }else{
            return false
        }
    }
    useEffect(() => {
        getProduct()
    },[getProduct])
    useEffect(() => {
        axios.get("http://localhost:9090/category").then((response) => {
            setCategory(response.data)
        }).catch((error) => console.log(error))
    },[])
    const handleDelete = (id) => {
        axios.delete(`http://localhost:9090/product/${id}`).then((response) => {
            if(response.status === 200){
                setDeleteModal(!deleteModal)
            }
        }).catch((error)  => console.log(error))
    }
    return(
        <>
            {data?.length?
                <Row>
                    {data?.map((item) => (
                        <Col key={item.id}>
                            <Image src={item.image}></Image>
                            <Title>{item.name}</Title>
                            <Title>{item.price}</Title>
                            <div>
                            <Button type="primary" onClick={() => {
                                setModal(!modal)
                                setNumber(item.id)
                            }} style={{margin: "0rem 1rem"}}>Yangilash</Button>
                            <Button type="primary" style={{margin: "0rem 1rem"}} onClick={() => {
                                 setNumber(item.id)
                                 setDeleteModal(!deleteModal)
                            }}>Delete</Button>
                            <Modal modal={deleteModal} setModal={setDeleteModal} title="Uchirishni hohlaysizmi">
                                <div>
                                    <Button type="primary" onClick={() =>  handleDelete(item.id)}>Ha</Button>
                                    <Button type="primary">Yuq</Button>
                                </div>
                            </Modal>
                            </div>
                            <Modal modal={modal} setModal={setModal} title="Mahsulotni yangilash">
                                <Formik onSubmit={handleSub}  initialValues={initialValues} validationSchema={validationSchema}>
                                    
                                    <Form >
                                        <Field id="name"  placeholder="ism" name="name" type="text"></Field>
                                        <ErrorMessage name="name"/>
                                        <Field id="price" placeholder="narx" type="number" name="price"/>
                                        <ErrorMessage name="price"/> 
                                        <Field id="image" placeholder="url" name="image" type="url"/>
                                        <ErrorMessage name="image"/>
                                        <Field defaultValue="Category"  id="category" as="select" name="category" style={{display:"block"}}>
                                            <option value="Category" selected disabled>Category</option>
                                            {category?.map((item) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="category"/>
                                        <button type="submit">Yangilash</button>
                                    </Form>
                                </Formik>
                            </Modal>
                        </Col>
                    ))}
                </Row>
            :<Title title="4">Samsung brend ga tegishli mahsulot mavjud emas</Title>}
        </>
    )
}