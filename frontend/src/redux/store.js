import { configureStore, } from "@reduxjs/toolkit";
import userslice from "./slices/authanticationSlice";
import todoSlice from "./slices/todoSlice";

 const store=configureStore({
    reducer:{
        user:userslice,
        todos:todoSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;