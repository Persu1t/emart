import { Link, Outlet } from "react-router-dom"
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
function Navbars({ searchRef, handleSearch }) {
    const user = useSelector(userSelect)
    const dispatch = useDispatch()
    // using the useLocation() for navigation
    const history = useLocation()
    // function handle click for the logout
    function handleClick(e) {
        e.preventDefault()
        localStorage.clear()
        dispatch(action.logout())
        signOut(auth)
            .then(() => (history.push("/")))
            .catch((error) => console.log(error))
        toast.success("Logged out successfully", {
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

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: "#fff" }}>Dont@MeShop</Link>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart" style={{ color: "#fff" }}><BsCart /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orderhistory" style={{ color: "#fff" }}>History</Link>
                            </li>
                            {user ? <li className="nav-item button" onClick={handleClick}>
                                Logout
                            </li> : <li className="nav-item button"><Link to="/siginin" style={{ color: "white", textDecoration: "none" }}>Siginin/Siginup</Link></li>}
                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: "#fff" }}>{user?.displayName}</Link>
                            </li>



                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={searchRef} onChange={() => handleSearch()} />
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
export default Navbars