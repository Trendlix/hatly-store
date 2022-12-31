import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const saveToCookies = cartState => {
  console.log(JSON.stringify(cartState))
  const strState = JSON.stringify(cartState)
  Cookies.set('cart', strState);
};

let products = []
let quantity = 0
let total = 0

if (typeof window !== "undefined") {
  const cart = JSON.parse(localStorage.getItem('cart'))
  products = cart.products
  quantity = cart.quantity
  total = cart.total

}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products,
    quantity,
    total,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push({
        ...action.payload.product,
        quantity: action.payload.singleProductQuantity,
      });
      state.total += Number(action.payload.product.price_list_rate * action.payload.singleProductQuantity);
      // saveToCookies({
      //   products: state.products,
      //   quantity: state.quantity,
      //   total: state.total,
      // })
      if (typeof window !== "undefined") {
        localStorage.setItem('cart', JSON.stringify({
          products: state.products,
          quantity: state.quantity,
          total: state.total,
        }))
      }
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.map((product, i) => {
        if (product.id === action.payload.id) {
          return state.products.splice(i, 1);
        }
      });
      state.total -= action.payload.price;
      // saveToCookies({
      //   products: state.products,
      //   quantity: state.quantity,
      //   total: state.total,
      // })
      if (typeof window !== "undefined") {
        localStorage.setItem('cart', JSON.stringify({
          products: state.products,
          quantity: state.quantity,
          total: state.total,
        }))
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
