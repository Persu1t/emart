import { useEffect, useState } from "react";
// importing db from firebase
import { db } from "../../firebaseinit";
// importing collection getDocs where and query from firebase firestore for displaying orders history
import { collection, getDocs, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import "./orderHistory.css"
// importing userSelect from signup reducer
import { userSelect } from "../../redux/signupReducer";

import { googleSelect } from "../../redux/googleLoginReducer";
import { FaRupeeSign } from "react-icons/fa";

function OrderHistory() {
  // using useState for loacal state management
  const [recentOrder, setRecentOrder] = useState([]);
  const { user, signedInWithEmail } = useSelector(userSelect);
  const { googleUser } = useSelector(googleSelect)
  // function converting milliseconds to date formatte
  useEffect(() => {
    const fetchRecentOrders = async()=> {
      
  
      try {
        const q = query(collection(db, `recent orders ${signedInWithEmail ? user.uid : googleUser.uid}`));
        const snapShot = await getDocs(q);
        const recentOrders = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setRecentOrder(recentOrders);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    }
  
    fetchRecentOrders();
  }, [googleUser?.uid, signedInWithEmail, user?.uid, googleUser, user]);

  function convertToDateObject(date) {
    const milliseconds = date.seconds * 1000 + Math.round(date.nanoseconds / 1000000);
    return new Date(milliseconds);
  }
    // useEffect is used to get the docs and set the docs in local state.
   
  // function formatting the date provided by upper function into readable format
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }


  return (
    <>
      {recentOrder?.length !== 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Purchased On</th>
              </tr>
            </thead>
            <tbody>
              {recentOrder.map((doc, index) => {
                const createdOnDate = convertToDateObject(doc.createdOn);
                return (
                  <>
                    <tr key={index}>
                      <td>{doc.Title}</td>
                      <td>{doc.quantity}</td>
                      <td> <FaRupeeSign /> {doc.totalPrice}</td>
                      <td>{formatDate(createdOnDate)}</td>
                    </tr>

                  </>
                )
              })}
            </tbody>
          </table>
        </>) : (<h1>Nothing here</h1>) }
    </>
  );
}

export default OrderHistory;