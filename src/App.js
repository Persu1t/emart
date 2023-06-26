import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
// importing redux store
import { store } from './app/store';
import { useSelector, useDispatch } from 'react-redux';
// importing the auth from firebase
import { auth } from './firebaseinit';
// importing onAuthStateChanged from firebase/auth
import { onAuthStateChanged } from 'firebase/auth';
// importing Provider from react-redux for the store
import { Provider } from 'react-redux'
// importing BrowserRouter, Routes, Route, Navigate from the react-router-dom for the routing purpose
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/productListing/home';
import Signup from './pages/signup/signup';
import Cart from './pages/Addtocart/Addtocart';
import OrderHistory from './pages/orderHistory/orderHistory';
import Loader from './pages/loader/loader';
// importing the ToastContainer from the react-toastify for the notifications
import { ToastContainer } from 'react-toastify'
// importing toastify css
import 'react-toastify/dist/ReactToastify.css';
import { action, userSelect } from './redux/signupReducer';

function App() {
  const[loading, setLoading] = useState(true)
  const user = useSelector(userSelect);
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
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
      {loading && <Loader/>}
        { !loading && (<Routes>
            <>
              <Route exact path='/' element={user? (<>  <Home/></>) : <Navigate to={'/signup'}/>}/>
              <Route path="/cart" element={user? <Cart />: <Navigate to={'/signup'}/>} />
              <Route path="/orderhistory" element=  {user? <OrderHistory />: <Navigate to={'/signup'}/>}/>
              {/* setLoading passed as prop for the signup component */}
              <Route exact path="/signup" element={user? <Navigate to='/'/> : <Signup setLoading={setLoading}/> }/>
            </>
        </Routes>)}
      </BrowserRouter>
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
