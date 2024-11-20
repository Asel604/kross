import { configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice"

const myStore = configureStore({
    reducer:{
        cart:cartReducer
        
    }
})
export default myStore