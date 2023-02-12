import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActionReducer } from "../../store/Reducer"
import { Button, Col, Image,Row , Typography} from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Modal } from "../../Modal"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useCart } from "react-use-cart"
const {Title} = Typography

export const All = () => {
    const date = new Date()
    const {addItem } = useCart()
    const [modal, setModal] = useState(!true)
    const [number, setNumber] = useState(0)
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const selector = useSelector((state) => state.PostsReducers.posts )
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        name: Yup.string().required("Ism majburiy"),
        price: Yup.string().required("Narxi majburiy"),
        image: Yup.string().required("Image majburiy"),
        category: Yup.string().required("Category majburiy")
    })
    const {register, formState:{errors, isValid}, handleSubmit, watch} = useForm({
        values: {
            name: "",
            price: "",
            category: "category",
            image: ""
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    })
    const getProduct = useCallback( async() => {
        const jsons = await axios({
            method: "GET",
            url: "http://localhost:9090/product"
        }).catch((error) => console.log(error))
        let response = await jsons.data
        dispatch(ActionReducer.setPosts(response))
    },[])
    useEffect(() => {
        getProduct()
    },[getProduct])
    const onSubmit = async (event) => {
        const fetching = await fetch(`http://localhost:9090/product/${number}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At`})
        }).catch((error) => console.log(error))
        if(fetching.ok !== false){
            let response = await fetching.json()
            setModal(!modal)
            getProduct()
        }
    }
    useEffect(() => {
        ;(function(){
            axios.get("http://localhost:9090/category").then((response) => setCategory(response.data)).catch(error => console.log(error))
        }())
    },[])
    const handleDelete = (id) => {
        fetch(`http://localhost:9090/product/${id}`, {
            method: "Delete"
        }).then((response) => response.json()).then((data) => {
            if(data){
                getProduct()
                console.log(data)
            }
        }).catch((error) => console.log(error))
    }
    return(
        <>
            {selector?.length?
                <Row justify={"space-evenly"} style={{flexWrap: "wrap"}} align="middle">
                    {selector?.map((item) => (
                        <Col style={{width: "25%"}}>
                            <Image src={item.image}></Image>
                            <Title>{item.name}</Title>
                            <Button type="primary" onClick={() => addItem(item) }><ShoppingCartOutlined/> Sotib olish</Button>
                            <Button type="primary" onClick={() => {
                                setModal(!modal)
                                setNumber(item.id)
                            }}>Yangilash</Button>
                            <Button type="primary" onClick={() => handleDelete(item.id)}>O'chirish</Button>
                        </Col>
                    ))
                        }
                      <Modal title="Mahsulotni yangilash" modal={modal} setModal={setModal} >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                 <input type="text" {...register("name")} placeholder="Name" name="name" />
                                 {errors?.name? <p>Ism majburiy</p> : false}
                                 <input type="number" {...register("price")} placeholder="Price" name="price" />
                                 {errors?.price? <p>Narx majburiy</p> : false}
                                 <input type="url" {...register("image")} placeholder="Image" name="image"></input>
                                 {errors?.image? <p>Image majburiy</p> : false}
                                 <select name="category" defaultValue={"category"} {...register("category")} >
                                 <option value="category" selected disabled>Category</option>
                                 {category?.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                 ))}
                                 </select>
                                 {errors?.category? <p>Category majburiy</p> : false}
                                 <button disabled={!isValid}>Yangilash</button>
                            </form>
                           </Modal>
                      
                </Row>
            : <Title>Hali productlar yuq</Title>}
            
        </>
    )
}