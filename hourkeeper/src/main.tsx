import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Navbar />
        <RouterProvider router={router}/>
    </React.StrictMode>
);
