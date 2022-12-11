import React, {useContext, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import Input from "../../utils/input/input";
import './Auth.css'
import {login, registration} from "../../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email,setEmail] = useState('')
    const [Login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data;
            if(isLogin)
            {
                data = await login(email,password)
            }else {
                data = await registration(Login,email,password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            if(user.user.role === 'ADMIN')
                user.setIsAdmin(true)
            navigate(HOME_ROUTE)
        }catch (e){
            alert(e.response.data.message)
        }

    }

    return (
        <div className="container_auth">
            {!isLogin ?
                <div className='authorization'>
                    <div className="authorization-header">Регистрация</div>
                    <Input
                        value={Login}
                        onChange={e => setLogin(e.target.value)}
                        type="login"
                        placeholder="Введите имя пользователя"/>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="Введите email"/>
                    <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Введите пароль"/>
                    <button onClick={click} className="authorization_btn">Зарегистрироваться</button>
                </div>
                :
                <div className='authorization'>
                    <div className="authorization-header">Авторизация</div>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="Введите email"/>
                    <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Введите пароль"/>
                    <button onClick={click} className="authorization_btn">Войти</button>
                </div>
            }
        </div>
    );
});

export default Auth;