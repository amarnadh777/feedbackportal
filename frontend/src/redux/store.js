import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productSlice"
import authReducer from "./authSlice"
import feedbackReducer from "./feedbackSlice"
const presistConfig = {
    key:"feedbackPortal",
    storage
}

const presistedReducer = persistReducer(presistConfig,combineReducers({productReducer,authReducer,feedbackReducer}))
const store = configureStore({
    reducer:presistedReducer
})
const persistor = persistStore(store)
export  {store,persistor}    