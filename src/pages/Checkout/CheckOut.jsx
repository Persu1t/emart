import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { googleSelect } from "../../redux/googleLoginReducer";
import { userSelect } from "../../redux/signupReducer";

import useRazorpay from "react-razorpay"
import { useNavigate } from "react-router-dom";

import { db } from "../../firebaseinit";
import { addDoc, collection } from "@firebase/firestore";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { googleUser, signedInWithGmail } = useSelector(googleSelect);
  const { user, signedInWithEmail } = useSelector(userSelect);
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState([])
  const Razorpay = useRazorpay()
  const navigate = useNavigate()

  useEffect(()=>{
    const totalValue = JSON.parse(localStorage.getItem("total"))
    const cartProducts = JSON.parse(localStorage.getItem("cart"))
    setTotal(totalValue)
    setProducts(cartProducts)
  },[])
  const makePayment = async(e) => {
    e.preventDefault()
    const options = {
      key: "rzp_test_FcZZYzIdILvpzz",
      amount: (total * 100),
      currency: "INR",
      name: "Don't@ShopMe",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: (res) => {
        toast.info(res);
      },
      prefill: {
        name: "",
        email: "shuklarishabh890@gmail.com",
        contact: "8433489789",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
    if (Array.isArray(products)) {
      products.map(async (item) => {
        const docRef = await addDoc(collection(db, `recent orders ${signedInWithEmail ? user.uid : googleUser.uid}`), {
          Title: item.title,
          quantity: item.quantity,
          totalPrice: item.totalPriceOfProduct,
          createdOn: new Date(),
        });
        return docRef;
      });
    }
  toast.success("Thanks for shoping from Dont@MeShop")
    navigate("/");
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
  };
  return (
    <div className="login-form-container">
      <h1 className="company-name">Dont@MeShop</h1>
      <h2 className="company-name">
        Please verify your credentials and make payment
      </h2>
      
        <form className="login-form" onSubmit={makePayment}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Abc-XYZ"
              value={
                signedInWithEmail
                  ? user.displayName
                  : signedInWithGmail
                  ? googleUser.displayName
                  : ""
              }
              disabled
            />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="abc@example.com"
              value={
                signedInWithEmail
                  ? user.email
                  : signedInWithGmail
                  ? googleUser.email
                  : ""
              }
              disabled
            />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Your current address"
              required
            ></textarea>
          </div>
          <button className="btn btn-primary">
            Make Payment
          </button>
        </form>
      </div>
  );
};

export default CheckOut;
