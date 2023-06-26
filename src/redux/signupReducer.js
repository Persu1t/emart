// importing createSlice from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null
    },
    reducers:{
        // login action when the user tries to login/signup
        login:(state, action)=>{
            state.user = action.payload
        },
        // logout action when the user tries to logout
        logout:(state, action)=>{
            state.user = null
        }
    }
})
// exporting userReducer, action, userSelect

export const userReducer = userSlice.reducer

export const action = userSlice.actions

export const userSelect = (state)=> state.userReducer.user