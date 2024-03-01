import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bulma/bulma.sass'
import {
    createBrowserRouter, createRoutesFromElements, Route,
    RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration.tsx";
import Login from "./Pages/Login.tsx";
import NotFound from "./Pages/NotFound.tsx";
import ListHours from "./Pages/ListHours.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/register"} element={<Registration/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/hours"} element={<ListHours />}/>
            <Route errorElement={NotFound()}/>'
        </>
    ));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
