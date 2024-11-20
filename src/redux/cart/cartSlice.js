


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const saveToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};


const loadFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};


export const fetchCartFromApi = createAsyncThunk(
  "cart/fetchCartFromApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://66fd3da2c3a184a84d199c30.mockapi.io/basket"
      );
      return response.data; 
    } catch (error) {
      console.error( error);
      return rejectWithValue(error.message); 
    }
  }
);


export const postApi = createAsyncThunk(
  "cart/postApi",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://66fd3da2c3a184a84d199c30.mockapi.io/basket",
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message); 
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: loadFromLocalStorage(),
    status: null, 
    error: null, 
  },
  reducers: {
 
    addCartLocal: (state, action) => {
      const findProduct = state.list.find((x) => x.id === action.payload.id);
      if (!findProduct) {
        state.list.push({ ...action.payload, quantity: 1 });
      } else {
        findProduct.quantity += 1; 
      }
      saveToLocalStorage(state.list);
    },

    removeCart: (state, action) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
      saveToLocalStorage(state.list); 
    },
  },
  extraReducers: (builder) => {
  
    builder
   
      .addCase(fetchCartFromApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartFromApi.fulfilled, (state, action) => {
        state.status = "success";
        console.log( action.payload);
        
        state.list = action.payload;
        saveToLocalStorage(state.list);
      })
      .addCase(fetchCartFromApi.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.payload; 
        console.error(action.payload);
      })
     
      .addCase(postApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postApi.fulfilled, (state, action) => {
        state.status = "success";
        console.log( action.payload);
        
        state.list.push({ ...action.payload, quantity: 1 });
        saveToLocalStorage(state.list);
      })
      .addCase(postApi.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.payload;
        console.error( action.payload);
      });
  },
});

export const { addCartLocal, removeCart } = cartSlice.actions;
export default cartSlice.reducer;



