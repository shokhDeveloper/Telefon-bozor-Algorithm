import { Button, Form, Table, Input, Typography } from "antd"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Modal } from "../../../Modal"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
const {Text} = Typography
export const Renders = () => {
    const  date = new Date()
    const [modal, setModal]  =useState(!true)
    const [data, setData]  =useState([])
    const [number, setNumber] = useState(0)
    const validationSchema = Yup.object({
        name: Yup.string().required("Name majboriy"),
        action: Yup.string().required("Action majburiy")
    })
    const {register, formState, formState:{errors, isValid}, handleSubmit, watch } = useForm({
        defaultValues: {
            name: "",
            action:""
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    })
    const getCategory = useCallback(() => {
        axios.get("http://localhost:9090/category").then((response) => {
            setData(response.data)
            console.log(response.data)
        }).catch((error) => console.log(error))
    }, [])
    useEffect(() => {
        getCategory()
    },[getCategory])
    console.log(formState)
    const columns = [
     {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action"
    },
    {
        title: "Yangilash",
        dataIndex: "update",
        key: "edit"
    }
]
const handleEdit = (id) => {
    setModal(!modal)
}
let array = []
array = data.map((item) => (
    {
        id: item.id,
        name: item.name,
        action: item.action,
        update: <Button type="primary" onClick={() => {
            handleEdit(item.id)
            setNumber(item.id)
        }}>Yangilash</Button>
    }    
))
    const onSubmit = async (event) => {
        if(number !== 0){
            const jsons = await axios({
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At` },
                url: `http://localhost:9090/category/${number}`
            }).catch((error) => console.log(error))
            if(jsons.status === 200){
                setModal(!modal)
            }
            let response = await jsons.data
            console.log(response)
            getCategory()
        }
    }
    watch()
    return (   
        <>
            <Table  dataSource={array} columns={columns} ></Table>
            <Modal modal={modal} setModal={setModal} title="Category yangilash">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" name="name" {...register("name")} style={{margin: "1rem"}}/>
                    {errors?.name? <Text>{errors.name.message}</Text>: false}
                    <input type="text" name="action" {...register("action")} style={{margin: "1rem"}} />
                    {errors?.action? <Text>{errors.action.message}</Text>: false}
                    <div className="form_btn">
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}