
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { createWrapper } from "next-redux-wrapper";


const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });


export const wrapper = createWrapper(makeStore);


export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
