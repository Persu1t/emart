
import { useState } from "react"
// importing createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword firebase/auth
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// importing  auth from the firebase
import { auth } from "../../firebaseinit"
import { useDispatch } from "react-redux"
// importing action from signupReducer
import { action } from "../../redux/signupReducer"
import { actions } from "../../redux/googleLoginReducer"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./signup.css"

export default function Signup() {
    // setting up all the initial state required for the authentication 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()

    const siginInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result.user)
            dispatch(actions.googleLogin({
                email: result.user.email,
                displayName: result.user.displayName,
                photoUrl: result.user.photoURL,
                uid: result.user.uid

            }))

            navigate("/")
        }).catch((error) => console.log(error.message))
    }
    // Function to handle the user registration
    async function registerUser(e) {
        e.preventDefault()
        // Form validation
        if (!name) {
            return alert("Please enter a name")
        }
        if (password.length < 6) {
            return alert("Please enter a password greater than 6")
        }
        if (email.length < 5) {
            return alert("Enter a valid email address")
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match. Please match your password", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        }
        //  Creating a new user account
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

            updateProfile(userCredential.user, {
                displayName: name,
            })
                // dispatching login action when new user is created.
                .then(dispatch(action.login({
                    email: userCredential.user.email,
                    displayName: name,
                    uid: userCredential.user.uid
                })))
            navigate("/")
            toast.success("Successfully created user!", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        })

    }

    return (

        <>
            <div className="login-form-container">
                <h1 className="company-name">Dont@MeShop</h1>
                <h2 className="company-name">Create Your account</h2>
                <form className="login-form" onSubmit={(e) => registerUser(e)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputtext" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputtext"
                            aria-describedby="NamelHelp"
                            required
                            placeholder="Your Name here"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Your valid email address"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            placeholder="Type your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputConfirmPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputConfirmPassword1"
                            required
                            placeholder="Retype your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary">Register</button>

                    <div>
                        <span>
                            Already a member? &nbsp; <Link to="/siginin">Login</Link>
                        </span>
                    </div>
                </form>
                <div>
                    <button type="button" class="btn btn-danger" onClick={siginInWithGoogle}>Siginin With Google</button>
                </div>
            </div>
        </>
    )
}