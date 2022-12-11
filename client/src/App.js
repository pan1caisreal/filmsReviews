import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import NavBar from "./component/navbar/NavBar";
import './app.css'
import Footer from "./component/footer/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
    check().then(data=>{
        user.setUser(true)
        user.setIsAuth(true)
        user.setIsAdmin(true)
        if(user.user.role === 'ADMIN')
            user.setIsAdmin(true)
    }).finally(()=>setLoading(false))
    },[])

    return (
        <BrowserRouter>
            <NavBar />
            <div className="app">
                <AppRouter />
            </div>
            <Footer />
        </BrowserRouter>
    );
});

export default App;