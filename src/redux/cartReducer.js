// importing createSlice from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// parsing the data in object form from the local storage
let cartItem = JSON.parse(localStorage.getItem("cart"))
console.log(cartItem)

// creating a slice 
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        // products by default will be an empty array if add to cart button is clicked then it will be cartItem's array
        products: cartItem?.products||[],
        // cart quantity will also be 0 as initial the quantity else will be as cartItem quantity
        cartQuantity: cartItem?.cartQuantity||0,
        // cart totalPrice will also be 0 as initial the quantity else will be as cartItem totalPrice
        totalPrice: cartItem?.totalPrice||0
    },
    reducers:{
        // addProduct action pushes the needed things into the products array ands set the state in localStorage.
        addProducts:(state, action) => {
            console.log(action.payload)
            const id = action.payload.id
            const index =state.products.findIndex((item)=> item.id === id)
            console.log(cartItem)
            if(index <0){
                state.products.push({
                    id: id,
                    product: action.payload,
                    quantity: 1
                })
                // if any unique product is added to cart increase the cart quantity
                state.cartQuantity += 1
            }else{
                // product quantity is increased if product is not unique
                state.products[index].quantity += 1;
            }
                // totalPrice state got increased.
            state.totalPrice += action.payload.price;

            localStorage.setItem("cart", JSON.stringify(state));

        },
            // Remove product action  removes the products from state and also from the localStorage.
        removeProduct:(state, action) => {
            let id = action.payload.id
            console.log(action.payload)
            // finding the product  from products array
            let index = state.products.findIndex((item)=> id === item.id)
            // removing the product from the products array state
            state.products.splice(index, 1)
            // pricing adjustments
            state.totalPrice -= action.payload.quantity * action.payload.product.price;
            // setting up the local storage to the new and updated state
            localStorage.setItem("cart", JSON.stringify(state));

        },
        // Clearing the cart 
        clearCart:(state, action)=>{
            state.products = [];
            state.cartQuantity = 0;
            state.totalPrice = 0;
        }

    }
})

// exporting all the things cartReducer, actions and cartSelect
export const cartReducer = cartSlice.reducer
export const actions = cartSlice.actions
export const cartSelect = (state)=> state.cartReducer
