import { Row, Col, Typography, Image, Button, Form } from "antd"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Modal } from "../../Modal"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCart } from "react-use-cart"
import  {ShoppingCartOutlined} from "@ant-design/icons"
const {Title} = Typography
export const Xiaomi = () => {
    const date = new Date()
    const [data, setData] = useState([])
    const [modal, setModal] = useState(!true)
    const [category, setCategory] = useState([]) 
    const [number, setNumber] = useState(0)
    const [deleteModal, setDeleteModal] = useState(!true)
    const cart = useCart()
    const validationSchema = Yup.object({
        name: Yup.string().required("Mahsulot ism majburiy"),
        price: Yup.string().required("Mahsulot narxi majburiy"),
        image: Yup.string().required("Mahsulot rasm majburiy"),
        category: Yup.string().required("Mahsulot category majburiy")        
    })
    const {register, watch, formState, formState:{errors, isValid}, handleSubmit } = useForm({
        defaultValues:{
            name: "",
            price: Yup.number(),
            image: "",
            category: "default"
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema)

    })
    const getProduct = useCallback(() => {
        axios.get("http://localhost:9090/product?category=Xiaomi").then((response) => setData(response.data)).catch((error) => console.log(error))
    },[])
    useEffect(() => {
        getProduct()
    },[getProduct])
    useEffect(() => {
        axios.get("http://localhost:9090/category").then((response) => setCategory(response.data) ).catch((error) => console.log(error))
    },[])
    const onSubmit = async(event) => {
        if(number !== 0){
            const jsons = await axios({
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                data: {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At`},
                url: `http://localhost:9090/product/${number}`
            }).catch((error) => console.log(error))
            if(jsons.status === 200){
                setModal(!modal)
            }
            let response = await jsons.data
            console.log(response)
            getProduct()
        }
    }
    watch()
    return(
        <>
        {data?.length?
            <Row>
                {data?.map((item) => (
                    <Col>
                        <Image src={item.image}/>
                        <Title title="4">{item.name}</Title>
                        <Title title="5">{item.price}</Title>
                        <div>
                            <Button type="primary" style={{margin: "1rem"}} onClick={() => {
                                setModal(!modal)
                                setNumber(item.id)
                            }}>Yangilash</Button>
                            <Button type="primary" onClick={() => {
                                setDeleteModal(!deleteModal)
                            }} style={{margin: "1rem"}}>O'chirish</Button>
                            <Button type="primary" onClick={() => cart.addItem(item) } style={{margin: "1rem"}}><ShoppingCartOutlined/> Sotib olish  </Button>
                        </div>
                        <Modal modal={deleteModal} setModal={setDeleteModal} title="Ushbu mahsulotni o'chirishni hohlaysizmi ? ">
                            <Row justify={"space-around"} align="middle" style={{padding: "1rem"}}>
                                <Col>
                                    <Button type="primary" onClick={() => {
                                        setDeleteModal(!deleteModal)                                        
                                    }}>Yuq</Button>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={() => {
                                        axios.delete(`http://localhost:9090/product/${item.id}`).then((response) => {
                                            if(response.status === 200){
                                                setDeleteModal(!deleteModal)
                                                getProduct()
                                            }
                                        }).catch((error) => console.log(error))
                                    }}>Xa</Button>
                                </Col>
                            </Row>
                        </Modal>
                        <Modal modal={modal} setModal={setModal} title={"Mahsulotni yangilash"}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" name="name" {...register("name")}/>
                                {errors?.name? <p>{errors.name.message}</p>: false}
                                <input type="number" name="price" {...register("price")} />
                                {errors?.price? <p>{errors.price.message}</p>: false}
                                <input type="url" name="image" {...register("image")} />
                                {errors?.image? <p>{errors.image.message}</p>: false}
                                <select name="category" defaultValue={"default"} {...register('category')}>
                                    <option value="default" selected disabled>Category</option>
                                {category.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                ))}
                                {errors?.category? <p>{errors.category.message}</p>: false}
                                </select>
                                <button type="submiy">Yangilash</button>
                            </form>
                        </Modal>
                    </Col>
                ))}
            </Row>
        :<Title title="3">Xiaomi ga tegishli telefonlar hali yuq</Title>}
        </>
    )
}