import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { action, userSelect } from '../../redux/signupReducer'
import { auth } from "../../firebaseinit"
import { signOut } from "firebase/auth"
// importing the icons from the react icons package
import { BsCart } from "react-icons/bs";
//  importing useLocation from react-router-dom
import { useLocation } from "react-router-dom"
import "./navbar.css"
// importing toast from react-tostify
import { toast } from "react-toastify"
function Navbars(){
    const user = useSelector(userSelect)
    const dispatch = useDispatch()
    // using the useLocation() for navigation
    const history = useLocation()
    // function handle click for the logout
    function handleClick(e){
        e.preventDefault()
        localStorage.clear()
        dispatch(action.logout())
        signOut(auth)
        .then(()=>(history.push("/")))
        .catch((error)=>console.log(error))
        toast.success("Logged out successfully")
    }

 return(
    <>
        <div className="navbar-container">
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    {/*  linking home page */}
                    <Link to="/"style={{ color: "white" }}>
                        Dont@MeShop
                    </Link>
                </li>
                <li className="navbar-list-item">
                    {/* linking order history page */}
                    <Link to="/orderhistory"style={{ color: "white", textDecoration: "none"}}>
                        History
                    </Link>
                </li>
                <li className="navbar-list-item" id="icon">
                    {/* linking cart page */}
                    <Link to="/cart" style={{ color: "white", textDecoration: "none"}}><BsCart/></Link>
                </li>
                {/* logout button */}
                <li className="navbar-list-item" id="logout" onClick={handleClick}>
                    Logout
                </li>
                <li className="navbar-list-item">
                    {/* displaying user name */}
                    {user?.displayName}
                </li>
            </ul>
        </div>
    </>
 )
}
export default Navbars