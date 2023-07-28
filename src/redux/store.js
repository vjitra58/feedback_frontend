import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer.js";
import {productReducer} from "./reducers/productReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;

export const server = "https://feedback-backend-beta.vercel.app/api";