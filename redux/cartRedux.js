import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from "axios";
import { userState } from './features/user/userSlice';

axios.defaults.withCredentials = true;

const saveToCookies = cartState => {
  const strState = JSON.stringify(cartState);
  Cookies.set('cart', strState);
};

let products = [];
let quantity = 0;
let total = 0;

if (typeof window !== "undefined") {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    products = cart.products;
    quantity = cart.quantity;
    total = cart.total;
  }
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const { isAuthenticated } = userState(getState());
  if (isAuthenticated) {
    const response = await axios.get(`${process.env.API_URL}/cart`);
    return response.data;
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? cart : { products: [], quantity: 0, total: 0 };
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { getState }) => {
  const { isAuthenticated } = userState(getState());
  if (isAuthenticated) {
    const response = await axios.post(`${process.env.API_URL}/cart/add`, { productId, quantity });
    return response.data;
  } else {
    const cart = JSON.parse(localStorage.getItem('cart')) || { products: [], quantity: 0, total: 0 };
    const itemIndex = cart.products.findIndex(product => product.productId === productId);
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
      console.log(cart.products)
    }
    cart.quantity += quantity;
    const product = await axios.get(`${process.env.API_URL}/products/${productId}`);
    console.log(product)
    cart.total += product.data.price * quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ itemId }, { getState }) => {
  const { isAuthenticated } = userState(getState());
  if (isAuthenticated) {
    const response = await axios.delete(`${process.env.API_URL}/cart/${itemId}`);
    return response.data;
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const itemIndex = cart.products.findIndex(product => product.productId === itemId);
    if (itemIndex > -1) {
      const product = await axios.get(`${process.env.API_URL}/products/${itemId}`);
      cart.total -= product.data.price * cart.products[itemIndex].quantity;
      cart.quantity -= cart.products[itemIndex].quantity;
      cart.products.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
  }
});

export const checkoutCart = createAsyncThunk('cart/checkoutCart', async ({ address, paymentMethod }, { getState }) => {
  const { isAuthenticated } = userState(getState());
  if (isAuthenticated) {
    const response = await axios.post(`${process.env.API_URL}/cart/checkout`, { address, paymentMethod });
    return response.data;
  } else {
    throw new Error("User not authenticated");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products,
    quantity,
    total,
    status: 'idle',
    error: null
  },
  reducers: {
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.total = action.payload.total;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.total = action.payload.total;
        saveToCookies({
          products: state.products,
          quantity: state.quantity,
          total: state.total,
        });
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.total = action.payload.total;
        saveToCookies({
          products: state.products,
          quantity: state.quantity,
          total: state.total,
        });
      })
      // Checkout cart
      .addCase(checkoutCart.fulfilled, (state) => {
        state.products = [];
        state.quantity = 0;
        state.total = 0;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
