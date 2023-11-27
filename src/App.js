import React, { useState, useRef } from 'react';
import './App.css';
import { useEffect } from 'react';
// importing redux store
import { store } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
// importing the auth from firebase
import { auth } from './firebaseinit';
// importing onAuthStateChanged from firebase/auth
import { onAuthStateChanged } from 'firebase/auth';
// importing Provider from react-redux for the store
import { Provider } from 'react-redux'
// importing BrowserRouter, Routes, Route, Navigate from the react-router-dom for the routing purpose
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbars from './components/Navbar/navbar';
import Home from './pages/productListing/home';
// import ProductDetailsPage from './pages/ProductsDetails/productsdetails';
import Signup from './pages/signup/signup';
import Cart from './pages/Addtocart/Addtocart';
import OrderHistory from './pages/orderHistory/orderHistory';
import Loader from './pages/loader/loader';
// importing the ToastContainer from the react-toastify for the notifications
import 'react-toastify/dist/ReactToastify.css';
import { action } from './redux/signupReducer';
import Protected from './components/Protected/Protected';
import Notuser from './components/Not user/Notuser';
import Siginin from './pages/siginin/Siginin';
import ProductDetailsPage from './components/ProductsDetails/productsdetails';
import { productSelector } from './redux/productReducer';

function App() {
  // const[loading, setLoading] = useState(true)
  // const user = useSelector(userSelect);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const searchRef = useRef(null);
  const { data } = useSelector(productSelector)
  const dispatch = useDispatch();

  // using use effect on initial render on onAuthStateChanged so that. If state changes it must observed.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        // user is logged in
        dispatch(
          action.login({
            email: userCredential.email,
            displayName: userCredential.displayName,
            uid: userCredential.uid,
          })
        );
      } else {
        dispatch(action.logout());
      }
    });

    // Cleanup function to unsubscribe from the auth state changes
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  // useEffect to show the loader component how much time
  useEffect(() => {
    const timer = setTimeout(() => {
      // setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function handleSearch() {
    let qr = searchRef.current.value;
    setSearchQuery(qr.toLowerCase());
    // filtring the data array that include searched querry and pushing it to arr
    const arr = data.filter((item) => {
      if (item.title.toLowerCase().includes(searchQuery)) {
        return item;
      }
      return null;
    });
    // setting the searchArray to the array of product searched
    setSearchArray(arr);
  }

  const router = createBrowserRouter([
    {
      path: "/", element: <Navbars searchRef={searchRef} handleSearch={handleSearch} />, children: [
        { index: true, element: <Home searchArray={searchArray} searchQuery={searchQuery} /> },
        { path: "/orderhistory", element: <Protected><OrderHistory /></Protected> },
        { path: "/cart", element: <Protected><Cart /></Protected> }

      ]
    },
    { path: "/:id", element: <ProductDetailsPage /> },
    { path: "/signup", element: <Notuser><Signup /></Notuser> },
    { path: "/siginin", element: <Notuser><Siginin /></Notuser> }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
