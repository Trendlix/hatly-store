import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const saveToCookies = cartState => {
  console.log( JSON.stringify(cartState))
  const strState = JSON.stringify(cartState)
  Cookies.set('cart',strState );
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push({
        ...action.payload.product,
        quantity: action.payload.singleProductQuantity,
      });
      state.total += Number(action.payload.product.price_list_rate * action.payload.singleProductQuantity);
      saveToCookies({
        products : state.products,
        quantity : state.quantity,
        total : state.total,
      })
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.map((product, i) => {
        if (product.id === action.payload.id) {
          return state.products.splice(i, 1);
        }
      });
      state.total -= action.payload.price;
      saveToCookies({
        products : state.products,
        quantity : state.quantity,
        total : state.total,
      })
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
