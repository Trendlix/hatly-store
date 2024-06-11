import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from "axios";
import { userState } from './features/user/userSlice';
import API_URL from "../API/ApiUrl";

axios.defaults.withCredentials = true;

// const saveToCookies = cartState => {
//   const strState = JSON.stringify(cartState);
//   Cookies.set('cart', strState);
// };

let products = [];
let totalQuantity = 0;
let total = 0;

if (typeof window !== "undefined") {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    products = cart.products;
    totalQuantity = cart.totalQuantity;
    total = cart.total;
  }
}

export const syncCart = createAsyncThunk('cart/syncCart', async (_, { getState, dispatch }) => {
  const { isAuthenticated } = userState(getState());
  if (isAuthenticated) {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart && localCart.products.length > 0) {
      const response = await axios.post(`${API_URL}/cart/sync`, localCart);
      localStorage.removeItem('cart');
      const cart = {
        products: response.data.products.map(product => ({ ...product.product, quantity: product.quantity })),
        totalQuantity: response.data.totalQuantity,
        total: response.data.total,
      }
      await dispatch(fetchCart());
      return cart;
    }
  }
  return { products: [], totalQuantity: 0, total: 0 };
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const state = getState();
  const { isAuthenticated } = state.user;  // Accessing authentication state directly from the Redux state
  console.log('is authenticated on fetch cart', isAuthenticated);

  if (isAuthenticated) {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      const cart = {
        products: response.data.products.map(product => ({
          ...product.productId,
          quantity: product.quantity,
        })),
        totalQuantity: response.data.totalQuantity,
        total: response.data.total,
      };
      return cart;
    } catch (error) {
      console.error('Failed to fetch cart for authenticated user', error);
      throw error;
    }
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? cart : { products: [], totalQuantity: 0, total: 0 };
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ product, quantity }, { getState, dispatch }) => {
  console.log('start add to cart');
  const { isAuthenticated } = userState(getState());
  console.log('is authenticated on add to cart', isAuthenticated);
  
  if (isAuthenticated) {
    const response = await axios.post(`${API_URL}/cart/add`, { product, quantity });
    console.log(response.data);
    await dispatch(fetchCart());
    return response.data;
  } else {
    const cart = JSON.parse(localStorage.getItem('cart')) || { products: [], totalQuantity: 0, total: 0 };
    const itemIndex = cart.products.findIndex(product => product.product.item_code === product.item_code);

    let productData;
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
      productData = cart.products[itemIndex];
    } else {
      // const response = await axios.get(`${API_URL}/products/${productId}`);
      productData = { product, quantity };
      cart.products.push(productData);
    }

    cart.totalQuantity = cart.products.reduce((acc, product) => acc + product.quantity, 0);
    cart.total += product.price * quantity;

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    await dispatch(fetchCart());
    return cart;
  }
});


export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ product }, { getState, dispatch }) => {
  const { isAuthenticated } = userState(getState());
  
  if (isAuthenticated) {
    const response = await axios.delete(`${API_URL}/cart/${product}`);
    console.log(response.data);
    await dispatch(fetchCart());
    return response.data;
  } else {
    console.log('productPassed', product)
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    const itemIndex = cart.products.findIndex(item => item.product.item_code === product.item_code);
    console.log('itemIndex', itemIndex)
    if (itemIndex > -1) {
      // const product = await axios.get(`${API_URL}/products/${itemId}`);
      cart.total -= product.price * cart.products[itemIndex].quantity;
      cart.totalQuantity -= cart.products[itemIndex].quantity;
      cart.products.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(cart, 'after remove');
      await dispatch(fetchCart());
      return cart;
    }
  }
});

export const checkoutCart = createAsyncThunk('cart/checkoutCart', async ({ address, paymentMethod }, { getState }) => {
  const { isAuthenticated } = userState(getState());
  if (isAuthenticated) {
    const response = await axios.post(`${API_URL}/cart/checkout`, { address, paymentMethod });
    return response.data;
  } else {
    throw new Error("User not authenticated");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products,
    totalQuantity,
    total,
    status: 'idle',
    error: null
  },
  reducers: {
    setCart: (state, action) => {
      state.products = action.payload.products;
      state.totalQuantity = action.payload.totalQuantity;
      state.total = action.payload.total;
    },
    resetCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
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
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        // Handled by fetchCart
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Handled by fetchCart
      })
      // Checkout cart
      .addCase(checkoutCart.fulfilled, (state) => {
        state.products = [];
        state.totalQuantity = 0;
        state.total = 0;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
      });
  },
});

export const { resetCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
