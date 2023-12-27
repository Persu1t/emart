// import { useSelector, } from "react-redux"
// importing actions and cartSelect from cart reducer
// import { cartSelect } from "../../redux/cartReducer";
// importing razorpay from react-razorpay
// import useRazorpay from "react-razorpay"
// // importing database from firebase
// import { db } from "../../firebaseinit"
// // importing collection and addDoc from firebase firestore
// import { collection, addDoc } from "firebase/firestore";
// // importing userSelect from signupReducer 
// import { userSelect } from "../../redux/signupReducer"
import { Link } from "react-router-dom"
import "./Addtocart.css"
// import { toast } from 'react-toastify';
// // importing icon from react-icons
// import { BsTrash } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react";



function Cart() {
  const [products, setProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const productsArray = JSON.parse(localStorage.getItem("cart"))
    setProducts(productsArray)
    const total = JSON.parse(localStorage.getItem("total"))
    setCartTotal(total)
  },[])

  const handleDecrease = (id) => {
    const changedProductArray = JSON.parse(localStorage.getItem("cart"))
    let index = changedProductArray.findIndex(product => product.id === id)
    if (index !== -1) {
      if (changedProductArray[index].quantity !== 1) {
        changedProductArray[index].quantity -= 1
        changedProductArray[index].totalPriceOfProduct = Number(changedProductArray[index].totalPriceOfProduct) - Number(changedProductArray[index].price)
        let total =  changedProductArray.reduce((acc, curValue)=> acc+curValue.totalPriceOfProduct, 0)
        localStorage.setItem("cart", JSON.stringify(changedProductArray))
        localStorage.setItem("total", JSON.stringify(total))
        setProducts(JSON.parse(localStorage.getItem("cart")))
        setProducts(changedProductArray)
        setCartTotal(JSON.parse(localStorage.getItem("total")))
      } else {
        alert("Product can not be less than 1")
      }
    } else {
      alert("Product does not exist")
    }
  }

  const handleIncrease = (id) => {
    const changedProductArray = JSON.parse(localStorage.getItem("cart"))
    let index = changedProductArray.findIndex(product => product.id === id)
    if (index !== -1) {
      if (changedProductArray[index].quantity !== 30) {
        changedProductArray[index].quantity += 1
        changedProductArray[index].totalPriceOfProduct = Number(changedProductArray[index].totalPriceOfProduct) + Number(changedProductArray[index].price)
        let total =  changedProductArray.reduce((acc, curValue)=> acc+curValue.totalPriceOfProduct, 0)
        localStorage.setItem("cart", JSON.stringify(changedProductArray))
        localStorage.setItem("total", JSON.stringify(total))
        setProducts(JSON.parse(localStorage.getItem("cart")))
        setCartTotal(JSON.parse(localStorage.getItem("total")))
      } else {
        alert("Product can not be more than 30")
      }

    } else {
      alert("Product does not exist")
    }
  }

  const handleRemoveItem = (id) => {
    const changedProductArray = JSON.parse(localStorage.getItem("cart"))
    const productNotRemoved = changedProductArray.filter(product => product.id !== id)
    let total =  productNotRemoved.reduce((acc, curValue)=> acc+curValue.totalPriceOfProduct, 0)
    localStorage.setItem("cart", JSON.stringify(productNotRemoved))
    localStorage.setItem("total", JSON.stringify(total))
    setProducts(JSON.parse(localStorage.getItem("cart")))
    setCartTotal(JSON.parse(localStorage.getItem("total")))
  }

  return (
    <>
      {products === null || JSON.parse(localStorage.getItem("cart")) === null ?
        <h1>Nothing here</h1> :
        <>
          <div className="cart-list">
            {products === null || JSON.parse(localStorage.getItem("cart")).length === 0 ? <h1>Nothing here</h1> : products.map((product) => (
              <div className="card cards" >
                <img src={product.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text"><FaRupeeSign /><strong>{product.price}</strong></p>
                  <p className="card-text">{product.category}</p>
                  <div className="button-container">
                    <button className="btn btn-danger" onClick={() => handleRemoveItem(product.id)}>Remove Item</button>
                    <div className="button-container">
                      <button className="btn btn-primary" onClick={() => handleDecrease(product.id)}>-</button>
                      <p>{product.quantity}</p>
                      <button className="btn btn-primary" onClick={() => handleIncrease(product.id)}>+</button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
          <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
              <h1 className="text-body-emphasis"><FaRupeeSign/>{cartTotal}</h1>
              <button type="button" className="btn btn-outline-success "><Link className = "checkout-button" to="/checkoutPage">Checkout</Link></button>
              <p><strong>Please note that you can pay upto <FaRupeeSign/> 15000. Not more than that because of razorpay cap. Thanks :)</strong></p>
            </div>
          </div>
        </>
      }


    </>
  )

}

export default Cart