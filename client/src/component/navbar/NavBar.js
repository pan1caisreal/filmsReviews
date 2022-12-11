import React, {useContext} from 'react';
import {Context} from "../../index";
import './navbar.css'
import Logo from '../../assets/854855.png'
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const logout = () =>{
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        localStorage.removeItem('token')
        localStorage.removeItem('id')
    }

    return (
        <div className="navbar__">
            <div className="container">
                <img src={Logo} alt="" className="navbar_logo"/>
                <div className="navbar_header" onClick={() => navigate(HOME_ROUTE)}>Film review </div>
                {!user.IsAuth ?
                    <div className="navbar_">
                        <div className="navbar_login" onClick={() => navigate(LOGIN_ROUTE)}>Войти</div>
                        <div className="navbar_registration" onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</div>
                    </div>
                    :
                    <div className="navbar_">
                        <div className="navbar_profile" onClick={() => navigate(POSTS_ROUTE)}>Мои отзывы</div>
                        <div className="navbar_profile" onClick={() => navigate(MOVIES_ROUTE)}>Хочу посмотреть</div>
                        <div className="navbar_logout" onClick={() => logout()}>Выход</div>
                    </div>
                }
                {user.IsAdmin &&
                    <div className="navbar_logout" onClick={() => navigate(ADMIN_ROUTE)}>Админ Панель</div>
                }
            </div>
        </div>
    );
});

export default NavBar;