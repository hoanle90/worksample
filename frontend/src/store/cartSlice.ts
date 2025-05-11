import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartItem, CartState } from "../types";


const initialState: CartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (state[product.id]) {
        state[product.id].quantity += 1;
      } else {
        state[product.id] = {
          product,
          quantity: 1,
        };
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (state[id]) {
        state[id].quantity = quantity;
        if (quantity <= 0) {
          delete state[id];
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    clearCart: () => {
      return {};
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
