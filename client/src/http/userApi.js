import {authApi,Api} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (login, email, password) =>{
    const {data} = await Api.post('user/registration',{email,login,password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) =>{
    const {data} = await Api.post('user/login',{email,password})
    localStorage.setItem('token', data.token)
    const user = jwtDecode(data.token)
    localStorage.setItem('id', user.id)
    console.log(localStorage.getItem('id'))
    return jwtDecode(data.token)
}

export const check = async () =>{
    const {data} = await authApi.get('user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)

}