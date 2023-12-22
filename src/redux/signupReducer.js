// importing createSlice from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

let signedInUserEmail = JSON.parse(localStorage.getItem("User"))

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
        signedInWithEmail: signedInUserEmail?.signedInWithEmail || false,
    },
    reducers:{
        // login action when the user tries to login/signup
        login:(state, action)=>{
            state.user = action.payload
            state.signedInWithEmail = true
            localStorage.setItem("User", JSON.stringify(state.signedInWithEmail))
        },

        // logout action when the user tries to logout
        logout:(state, action)=>{
            state.user = null
            state.signedInWithEmail = false
            localStorage.removeItem("User")
        }
    }
})
// exporting userReducer, action, userSelect

export const userReducer = userSlice.reducer

export const action = userSlice.actions

export const userSelect = (state)=> state.userReducer
