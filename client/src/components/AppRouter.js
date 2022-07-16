import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Routes, Route} from 'react-router-dom'
import { Context } from '..';
import Admin from '../pages/Admin/Admin';
import Shop from '../pages/Shop/Shop';
import { authRoutes, publicRoutes } from '../routes';
import { ADMIN_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
            <Route 
            key={path} 
            path={path} 
            element={Component} />
            )}
            {user.isAuth && 
            authRoutes.map(({path, Component}) =>
            <Route
            key={path}
            path={path}
            element={Component}
            />
            )}
            {user.user.role === 'ADMIN' && <Route 
            path={ADMIN_ROUTE}
            element={<Admin />}
            />}
             <Route path='*' element={<Shop/>}/>
        </Routes>
    );
});


export default AppRouter;