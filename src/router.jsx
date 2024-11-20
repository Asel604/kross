import { createBrowserRouter } from "react-router-dom";
import Layout from "../src/Layout/Layout"
import Home from "../src/Pages/Home"
import Cart from "./Components/cart/Cart";


export const myRouter = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/cart",
                element:<Cart/>,
            }
        ],


    }
])