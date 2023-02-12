import { Col, Row , Typography, Image, Button} from "antd"
import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Modal } from "../../Modal"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Home_Page } from "../../Private/Header/pages"
import { Context } from "../../Context/Context"
import { useCart } from "react-use-cart"
import { ShopOutlined } from "@ant-design/icons"
import { ShoppingCartOutlined } from "@ant-design/icons/lib/icons"
const {Title} = Typography
export const Iphone = () => {
    const date = new Date()
    const cart= useCart()
    console.log(cart)
    const {gets, setGets} = useContext(Context)
    const [category, setCategpry] = useState([])
    const [number, setNumber] = useState(0)
    const validationSchema = Yup.object({
        name: Yup.string().required("Ism muxim"),
        price: Yup.number().required("Narxi muxim"),
        image: Yup.string().required("Rasm muxim"),
        category : Yup.string().required("Category muxim")        
    })
    const {register, watch, formState, handleSubmit, formState:{errors, isValid}} = useForm({
        defaultValues: {
            name: "",
            price: "",
            image: "",
            category : ""
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    })
    const [updateModal, setUpdateModal] = useState(!true)
    const [data, setData] = useState([])
    const getProduct = useCallback(async () => {
        const jsons = await axios({
            method: "GET",
            url: "http://localhost:9090/product?category=Apple"
        }).catch((error) => console.log(error))
        const response = await jsons.data
       setData(response)
    } ,[])
    useEffect(() => {
        getProduct()
        setGets(getProduct)
    },[getProduct])
    useEffect(() => {
        ;(() => {
            axios.get("http://localhost:9090/category").then((response) => setCategpry(response.data) ).catch((error) => console.log(error)).finally(() => console.log("Loading ... "))
        })()
    },[])
    const onSubmit= (event) => {
        if(number !== 0){
            axios.put(`http://localhost:9090/product/${number}`, {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At`}).then((response) => {
                // response.data
                if(response.status === 200){
                    setUpdateModal(!updateModal)
                }
            }).catch((error) => console.log(error))
            getProduct()
        }else{
            console.log(false)
        }
    }
    watch()
    return(
        <>
            {data?.length?
                <Row justify={"space-evenly"} style={{flexWrap: "wrap"}} align="middle">
                    {data?.map((item) => (
                        <Col>
                            <Image src={item.image}/>
                            <Title title="2">{item.name}</Title>
                            <Title title="4">{item.price}</Title>
                            <div>
                                <Button onClick={() => { setNumber(item.id)
                                     setUpdateModal(!updateModal)}} type="primary" style={{margin: "1rem"}}>
                                    Yangilash
                                </Button>
                                <Button type="primary" style={{margin: "1rem"}}>
                                    O'chirish
                                </Button>
                                <Button type="primary"  onClick={() => {
                                    cart.addItem(item)
                                }} ><ShoppingCartOutlined/> Sotib olish</Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            : <Title>Hali Apple ga tegishli mahsulotlar yuq</Title>}
            <Modal modal={updateModal} setModal={setUpdateModal} title="Ma'lumotni yangilsh">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="name" {...register("name")} />
                        <input type="number" name="price" {...register("price")} />
                        <input type="url" name="image" {...register("image")} />
                        <select name="category" defaultValue={"category"} {...register("category")}>
                            <option value="category" selected disabled>Category</option>
                            {category.map((item) => (
                                <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        <button disabled={!isValid} type="submit">Yangilash</button>
                    </form>
            </Modal>

        </>
    )
}