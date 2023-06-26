import { useEffect, useState } from "react";
// importing db from firebase
import { db } from "../../firebaseinit";
// importing collection getDocs where and query from firebase firestore for displaying orders history
import { collection, getDocs, where, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import "./orderHistory.css"
// importing userSelect from signup reducer
import { userSelect } from "../../redux/signupReducer";
import Navbars from "../../components/Navbar/navbar";
import Loader from "../loader/loader";

function OrderHistory() {
  // using useState for loacal state management
  const [recentOrder, setRecentOrder] = useState(null);
  const user = useSelector(userSelect);
// function converting milliseconds to date formatte
  function convertToDateObject(date) {
    const milliseconds = date.seconds * 1000 + Math.round(date.nanoseconds / 1000000);
    return new Date(milliseconds);
  }
// function formatting the date provided by upper function into readable format
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
// useEffect is used to get the docs and set the docs in local state.
  useEffect(() => {
    // making the function async  and getting all the docs with correct userUID
    async function fetchRecentOrders() {
      // using query here to get only those docs which fullfills the condition
      const q = query(collection(db, "recent orders"), where("userUID", "==", user.uid));
      const snapShot = await getDocs(q);
      const recentOrders = snapShot.docs.map((doc) => {
        // returning doc id and array present in the doc
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // setting the recentOrder state
      setRecentOrder(recentOrders);
    }
    // fetchingRecentOrders() function called here
    fetchRecentOrders();
  }, [user.uid]);

  return (
    <>
      <nav>
        <Navbars />
      </nav>

      {!recentOrder ? (
        <><Loader /></>
      ) : (
        <>
            <div className="History-product">
                <div className="row-box">
                  <h4 className="headings">Name</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Quantity</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Price</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Total</h4>
                </div>
                <div className="row-box">
                  <h4 className="headings">Purchased On</h4>
                </div>
            </div>
          {recentOrder.map((doc, index) => {
            // As created on is an object that gives second and nanoseconds so we have to make it in date fomate
            const createdOnDate = convertToDateObject(doc.createdOn);
            console.log(createdOnDate);

            return (
              <div className="history-list" key={index}>
                <div className="history-info-container"><p className="history-info">{doc.Name}</p></div>
                <div className="history-info-container"><p className="history-info">{doc.Quantity}</p></div>
                <div className="history-info-container"><p className="history-info">₹{doc.price}</p></div>
                <div className="history-info-container"><p className="history-info">₹{doc.totalPrice}</p></div>
                {/*As the createdOn is formatted in Date formate but still we need to convert it into readable formate*/}
                <div className="history-info-container"><p className="history-info">{formatDate(createdOnDate)}</p></div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default OrderHistory;