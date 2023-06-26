// I have made a single component to signup/signin. Please fill the name and everithing then click on the register button
// if already a user just fill email and password fields and click on signin button
import { useState } from "react"
// importing createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword firebase/auth
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
// importing  auth from the firebase
import { auth } from "../../firebaseinit"
import { useDispatch } from "react-redux"
// importing action from signupReducer
import { action } from "../../redux/signupReducer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./signup.css"

export default function Signup({setLoading}) {
    // setting up all the initial state required for the authentication 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // function to signin the user with email, password
    function signInUser(e) {
        e.preventDefault()
        // setloading to true as user is signing in
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // if user credentials matches in the firebase dispatch login action from the signupReducer
                dispatch(
                    action.login({
                        email: userCredential.user.email,
                        displayName: userCredential.user.displayName,
                        uid: userCredential.user.uid                   
                    })
                );
                setLoading(false)
                // notification of logged in success
                toast.success("Logged in successfully")
            })
            // handling any error occured
            .catch((err) => {
                alert(err);
                setLoading(false)
                navigate("/")
            });
            
    };
// Function to handle the user registration
    async function registerUser() {
        // Form validation
        if (!name) {
            return alert("Please enter a name")
        }
        if(password.length <6){
            return alert("Please enter a password greater than 6")
        }
        if(email.length < 5){
            return alert("Enter a valid email address")
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
                .catch((error) => {
                    console.log(error, "User can not be updated")
                })
                // error handling if any error occured
                .catch((error) => {
                    alert(error)
                    navigate("/")
                });
            navigate("/")
        })
        
    }

    return (
        <>
            <div className="form-container">
                <div className="heading">Welcome to Dont@ShopMe. Signup/Login here.</div>
                <form className="register-signin-form">
                    <div className="input-feilds-container">
                        <input type="text"
                            placeholder="Your name (Only if you are registring)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-field"
                        />
                        <input type="email"
                            placeholder="abc@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                        <input type="password"
                            placeholder="Make a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="btn-container">
                        {/* button handles signin of user */}
                        <button className="signin-btn" type="submit" onClick={(e) => signInUser(e)}>Sign in</button>
                    </div>
                </form>
                <p>Not a member {""} </p>
                {/* span handling registration of the user */}
                    <span className="register-btn" onClick={registerUser}>Register</span>
                
            </div>

        </>
    )
}