import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout></MainLayout>,
            children: [
                { index: true, element: <Home></Home> },
                { path: "services", element: <Services></Services> }
            ]
        }
    ]
)