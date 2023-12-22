import { Link, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { action, userSelect } from '../../redux/signupReducer'
import { auth } from "../../firebaseinit"
import { signOut } from "firebase/auth"
// importing the icons from the react icons package
import { BsCart } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { useState, useEffect } from "react"

// Storage
import { storage } from '../../firebaseinit';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

//  importing useLocation from react-router-dom
import "./navbar.css"
// importing toast from react-tostify
import { toast } from "react-toastify"
import { actions, googleSelect } from "../../redux/googleLoginReducer"
function Navbars({ searchRef, handleSearch }) {
    const {user, signedInWithEmail} = useSelector(userSelect)
    const { googleUser, signedInWithGmail} = useSelector(googleSelect)
    // const user2 = useSelector(userSelect2)
    // console.log(user2, "user2")
    const dispatch = useDispatch()
    const [imageList, setImageList] = useState([])
    const uploadedListRef = ref(storage, `${user?.uid}/`)
    const navigate = useNavigate()


    useEffect(() => {
        listAll(uploadedListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })
    }, [uploadedListRef])

    // function handle click for the logout
    function handleClick(e) {
        e.preventDefault()
        localStorage.clear()
        if(signedInWithEmail){
            dispatch(action.logout())
        }else{
            dispatch(actions.googleLogout())
        }
        signOut(auth)
            .then(() => (navigate("/")))
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
                        <ul className="navbar-nav custom2 me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart" style={{ color: "#fff" }}><BsCart /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orderhistory" style={{ color: "#fff" }}>History</Link>
                            </li>
                            {signedInWithEmail || signedInWithGmail ? <li className="nav-item button" onClick={handleClick}>
                                Logout
                            </li> : <li className="nav-item button"><Link to="/siginin" style={{ color: "white", textDecoration: "none" }}>Siginin/Siginup</Link></li>}
                           &nbsp; <li className="nav-item">
                                <Link to="/profile">
                                    {/* {user !== null ? imageList.length !== 0 ? <img src={imageList[0]} alt="hello" width="30" height="24" className="d-inline-block align-text-top custom" /> :<BsPerson/> :user2 !== null ? <img src={user2?.photoUrl} alt="back" width="30" height="24" className="d-inline-block align-text-top custom" />: null} */}
                                    {signedInWithEmail ? imageList.length !== 0 ? <img src={imageList[0]} alt="hello" width="30" height="24" className="d-inline-block align-text-top custom" />: <BsPerson/> : signedInWithGmail ? <img src={googleUser?.photoUrl} alt="back" width="30" height="24" className="d-inline-block align-text-top custom" />: null}
                                </Link>
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