import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import CollectionPage from "../Pages/Collections/CollectionPage";
import ProductDetails from "../Pages/ProductsDetalispage/ProductDetails";
import CheckoutPage from "../Pages/CheckOut/CheckoutPage";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout></MainLayout>,
            children: [
                { index: true, element: <Home></Home> },
                { path: "services", element: <Services></Services> },
                { path: "collections", element: <CollectionPage></CollectionPage> },
                { path: "products/:id", element: <ProductDetails></ProductDetails> },
                { path: "checkout", element: <CheckoutPage></CheckoutPage> },
            ]
        }
    ]
)