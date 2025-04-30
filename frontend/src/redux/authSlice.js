import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
    {
        name:"authSlive"
        ,
        initialState:{
            userData:[]
        } ,
        reducers:{
            loginUser:(state,action) =>
            {
                state.userData = action.payload
            },
            logout:(state,action) =>
            {
                state.userData = null
            }
    }
    }
)

export const {loginUser,logout } = authSlice.actions
export default authSlice.reducer