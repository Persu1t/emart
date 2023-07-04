import { useSelector, useDispatch } from "react-redux"
import Navbars from "../../components/Navbar/navbar"
// importing actions and cartSelect from cart reducer
import { actions, cartSelect } from "../../redux/cartReducer"
// importing razorpay from react-razorpay
import useRazorpay from "react-razorpay"
// importing database from firebase
import { db } from "../../firebaseinit"
// importing collection and addDoc from firebase firestore
import { collection, addDoc } from "firebase/firestore";
// importing userSelect from signupReducer 
import { userSelect } from "../../redux/signupReducer"
import { useNavigate } from "react-router-dom"
import "./Addtocart.css"
import { toast } from 'react-toastify';
// importing icon from react-icons
import { BsTrash } from "react-icons/bs";



function Cart(){
  // destructuring products and total price from cart reducer 
    const { products, totalPrice } = useSelector(cartSelect)
  // destructuring user from userReducer
    const user = useSelector(userSelect)
    const navigate = useNavigate()
    console.log(user)
    const dispatch = useDispatch()
    // defining razorpay
    const Razorpay = useRazorpay()
    //  function handleing the remove product
    function handleRemoveProduct(item){
      dispatch(actions.removeProduct(item))
      toast.success("Item removed successfully")
    }
    //  function handling payment and adding docs to the db
    async function handleClick(){
        const options = {
            key: "rzp_test_FcZZYzIdILvpzz",
            amount: Math.ceil(totalPrice * 81.92 * 1.18 * 100),
            currency: "INR",
            name: "Don't@ShopMe",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            handler: (res) => {
              console.log(res);
            },
            prefill: {
              name: "Rishabh Shukla",
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

          // Add a new document with a generated id.
          products.map(async(item)=>{
            const docRef = await addDoc(collection(db, "recent orders"), {
              Name: item.product.title.slice(0, 20),
              Quantity: item.quantity,
              price:((item.product.price)*81.92).toFixed(2),
              totalPrice:(item.quantity * item.product.price * 81.92).toFixed(2),
              createdOn: new Date(),
              userUID: user.uid          
            });
            console.log("Document written with ID: ", docRef.id);
          })
          localStorage.clear();
          navigate("/orderhistory")

    }
    return(
        <>
            <div className="cart">
                <Navbars/>
                <h2>Cart product</h2>
                <div className="list">
                    {products.length === 0 ? <h1>Cart is empty right now...</h1>
                    :
                    (
                        <>
                            <div className="cart-table">
              <div className="cart-product">
                <div className="row-box">
                  <h4 className="headings">Image</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Description</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Price</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Quantity</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Total</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Operations</h4>
                </div>
              </div>
              {products.map((item) => (
                <div key={item.id} className="cart-product">
                  <div className="row-box">
                    <div className="cart-img">
                      <img src={item.product.image} alt="" />
                    </div>
                  </div>
                  <div className="row-box">
                    <p className ="item-info">{item.product.title.slice(0, 20)}...</p>
                  </div>
                  <div className="row-box">
                    <p className ="item-info">₹{(item.product.price * 81.92).toFixed(2)}</p>
                  </div>
                  <div className="row-box">
                    <p className ="item-info">{item.quantity}</p>
                  </div>
                  <div className="row-box">
                    <p className ="item-info">
                      ₹{(item.quantity * item.product.price * 81.92).toFixed(2)}
                    </p>
                  </div>
                  <div className="row-box">
                    {/* button handled with removeProduct function */}
                    <button className="remove-btn" onClick={()=>handleRemoveProduct(item)}>
                     <BsTrash/>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Cart Summary</h2>
              <div className="Summary-row">
                <p className="payment-info">Net Amount : </p>
                <h3 className="summary-info">₹ {(totalPrice * 81.92).toFixed(2)}</h3>
              </div>
              <div className="Summary-row">
                <p className="payment-info">Total tax(GST) 9% SGST 9% CGST:</p>
                <h3 className="summary-info">₹ {(totalPrice * 81.92 * 0.18).toFixed(2)}</h3>
              </div>
              <div className="Summary-row"></div>
              <div className="divider"><hr/></div>
              <div className="Summary-row">
                <p><b className="payment-info">Gross Amount:</b></p>
                <h3 className="summary-info">₹ {Math.ceil(totalPrice * 81.92 * 1.18)}</h3>
              </div>
              <div className="Summary-row">
                {/* button handled with handleClick function */}
                <button className="payment-btn" onClick={() => handleClick()}>Make a Payment</button>
              </div>
              <div className="note">
                <b>Note:- Please take this into consideration that the amount limit is set up to Rs 15000. Any payment upper than Rs 15000 will
                  fail the transaction. Thanks :)
                </b>
              </div>
              
            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Cart