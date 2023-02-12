import "./Register.css"
import { Button, Col, Form, Input, Row, Typography } from "antd"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../Context";
import { Field } from "formik";
const {Text, Title} = Typography
export const Register = () => {
    let date = new Date()
    let navigator = useNavigate()
    let {token, setToken, setUser, setAdmin} = useContext(Context)
    const nameRef = useRef()
    const lastnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const validationSchema = Yup.object({
        name: Yup.string().required("Ism kiritish majburiy"),
        lastname: Yup.string().required("Familya kiritish majburiy"),
        email: Yup.string().email("Email xato").required("Email kiritish majburiy"),
        password: Yup.string().min(3, "Minimum 3").max(10, "Maximum 10").required("Parol kiritish majburiy")
    })
    const {formState, register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
        values: {
            name: "",
            lastname: "",
            email: "",
            password: ""
        },
        mode: "onBlur",

        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (event) => {
        const jsons = await axios({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: event,
            url:"http://localhost:9090/register"
        }).catch(error => console.log(error))
        let response = await jsons.data
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
    }
    watch()
    return(
        <Row justify={"center"} align="middle" style={{minHeight: "100vh"}}>
            <Col>
            <Title>Ruyhattan o'tish</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">
            {errors?.name? errors.name.message: "Ism"}
                <input ref={nameRef} id="name" type="text" name="name" {...register("name")} />
            </label>
            <label htmlFor="lastname">
            {errors?.lastname? errors.lastname.message : "Familya"}
            <input type="text" ref={lastnameRef} id="lastname" name="lastname" {...register("lastname")} />  
            </label>
            <label htmlFor="email">
            {errors?.email? errors.email.message:"Email"}
            <input type="email" ref={emailRef} id="email" name="email" {...register("email")} />
            </label>
            <label htmlFor="password">
            {errors?.password? errors.password.message: "Parol"}
            <input ref={passwordRef} type="password" id="password" name="password" {...register("password")} />
            </label>
            <button disabled={!isValid} type="submit">Yuborish</button>
            </form>
            <Link to={"/login"}>Sizda akkaunt bormi ?</Link>
            </Col>
        </Row>
    )
}