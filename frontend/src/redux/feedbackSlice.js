import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice(
    {
        name:"selectedfeedback"
        ,
        initialState:{
            selectetedFeedback:[]
        } ,
        reducers:{
            selectetedFeedback:(state,action) =>
            {
                state.selectetedFeedback = action.payload
            },
            clearFeedback:(state,action) =>
            {
                state.selectetedFeedback = null
            }
    }
    }
)

export const {selectetedFeedback,clearFeedback } = feedbackSlice.actions
export default feedbackSlice.reducer