import { createSlice } from "@reduxjs/toolkit";

let signedInUserGmail = JSON.stringify(localStorage.getItem("Gmail"))

const initialState = {
    googleUser: null,
    signedInWithGmail: signedInUserGmail?.signedInWithGmail || false
}

const googleSlice = createSlice({
    name: "googleAuth",
    initialState,
    reducers: {
        googleLogin: (state, action)=>{
            state.googleUser = action.payload
            state.signedInWithGmail = true
            localStorage.setItem("Gmail", JSON.stringify(state.signedInWithGmail))
        },
        googleLogout:(state, action)=>{
            state.googleUser = null
            state.signedInWithGmail = false
            localStorage.removeItem("Gmail")
        }
    }

})

export const googleReducer = googleSlice.reducer

export const actions = googleSlice.actions

export const googleSelect = (state)=> state.googleReducer
