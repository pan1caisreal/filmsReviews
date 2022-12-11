import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.IsAuth === true && authRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            {user.IsAdmin === true && adminRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route path={"*"} element={<Navigate to={HOME_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;