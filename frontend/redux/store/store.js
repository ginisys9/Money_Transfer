import { configureStore } from "@reduxjs/toolkit";
import useReducer  from "../userSlice";
import transferReducer  from "../transferSlice";

export const  store = configureStore({
     reducer:{
       user:useReducer,
       transfer:transferReducer
     }
})