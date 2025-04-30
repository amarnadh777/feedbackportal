import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice(
    {
        name:"selectedProduct"
        ,
        initialState:{
            selectedProduct:[]
        } ,
        reducers:{
            selectedProduct:(state,action) =>
            {
                state.selectedProduct = action.payload
            },
            clearProduct:(state,action) =>
            {
                state.selectedProduct = null
            }
    }
    }
)

export const { selectedProduct,clearProduct} = productSlice.actions
export default productSlice.reducer