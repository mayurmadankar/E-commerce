import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import adminProductsSlice from "./admin/products-slice/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice
  }
});
export default store;
