import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import CollectionPage from "../Pages/Collections/CollectionPage";
import ProductDetails from "../Pages/ProductsDetalispage/ProductDetails";
import CheckoutPage from "../Pages/CheckOut/CheckoutPage";
import OffersPage from "../Pages/OffersPage/OffersPage";
import AboutUs from "../Pages/About/AboutUs";
import NewPage from "../Pages/New/NewPage";
import WishlistPage from "../Pages/WishList/WishlistPage";
import MyOrders from "../Pages/User/MyOrders/MyOrders";
import AccountSettings from "../Pages/User/AccountSettings/AccountSettings";
import Register from "../Pages/Register/Register";
import Login from "../Pages/LogIn/Login";
import UserProfile from "../Pages/Profile/UserProfile";
import PrivateRoute from "./Privateroute";
import CartPage from "../Pages/CartPage/CartPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/DashBoard/pages/Dashboard";
import AdminRoute from "./AdminRoute";
import UsersList from "../Pages/DashBoard/Admin/Pages/UsersList";
import AddProduct from "../Pages/DashBoard/Admin/Pages/AddProducts";
import CollectionsPage from "../Pages/DashBoard/Admin/Pages/CollectionsPage";
import UpdateProduct from "../Pages/DashBoard/Admin/Pages/UpdateProduct";
import OrdersPage from "../Pages/DashBoard/Admin/Pages/OrdersPage";
import PaymentsPage from "../Pages/DashBoard/Admin/Pages/PaymentsPage";
import AccessControl from "../Pages/DashBoard/Admin/Pages/AccessControl";
import MyReturns from "../Pages/Returns/MyReturns";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "services", element: <Services></Services> },
      { path: "register", element: <Register></Register> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "collections", element: <CollectionPage></CollectionPage> },
      { path: "products/:id", element: <ProductDetails></ProductDetails> },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
        ),
      },
      {
        path: "returns-orders",
        element: (
          <PrivateRoute>
            <MyReturns></MyReturns>
          </PrivateRoute>
        ),
      },
      // { path: "checkout/:id", element: <CheckoutPage></CheckoutPage> },
      { path: "offers", element: <OffersPage></OffersPage> },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage></CartPage>
          </PrivateRoute>
        ),
      },
      { path: "about", element: <AboutUs></AboutUs> },
      { path: "new", element: <NewPage></NewPage> },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishlistPage></WishlistPage>
          </PrivateRoute>
        ),
      },
      {
        path: "account-settings",
        element: (
          <PrivateRoute>
            <AccountSettings></AccountSettings>
          </PrivateRoute>
        ),
      },
      // { path: "profile", element: <UserProfile></UserProfile>   },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path:"/dashboard",
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      { path:'/dashboard', element: <Dashboard></Dashboard>},
      { path:'/dashboard/users', element: <UsersList></UsersList>},
      { path:'/dashboard/add-product', element: <AddProduct></AddProduct>},
      { path:'/dashboard/collections', element: <CollectionsPage></CollectionsPage>},
      { path:'/dashboard/update-products', element: <UpdateProduct></UpdateProduct>},
      { path:'/dashboard/orders', element: <OrdersPage></OrdersPage>},
      { path:'/dashboard/payments', element: <PaymentsPage></PaymentsPage>},
      { path:'/dashboard/roles', element: <AccessControl></AccessControl>},

    ]

  }
]);
