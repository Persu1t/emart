import React, { useState } from "react";
import { auth } from "../../firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { action } from "../../redux/signupReducer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./siginin.css";

const Siginin = () => {
  const [sigininEmail, setSiginEmail] = useState("");
  const [sigininPassword, setSiginPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function signInUser(e) {
    e.preventDefault();
    // setloading to true as user is signing in
    signInWithEmailAndPassword(auth, sigininEmail, sigininPassword)
      .then((userCredential) => {
        // if user credentials matches in the firebase dispatch login action from the signupReducer
        dispatch(
          action.login({
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            uid: userCredential.user.uid,
          })
        );
        // notification of logged in success
        toast.success("Logged in successfully", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
        // setSiginEmail("");
        // setSiginPassword("");
      })
      // handling any error occured
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <div className="login-form-container">
        <h1 className="company-name">Dont@MeShop</h1>
        <h2 className="company-name">Welcome Back</h2>
        <form className="login-form" onSubmit={(e) => signInUser(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setSiginEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              onChange={(e) => setSiginPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">Login</button>

          <div>
            <span>
              Don't have an account? &nbsp; <Link to="/signup">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Siginin;
