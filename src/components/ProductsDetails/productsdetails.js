import { userSelect } from "../../redux/signupReducer"
import { useSelector } from "react-redux";
import "./productsdetails.css"
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseinit";
import Loader from "../../pages/loader/loader"
import { FaStar } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

import { storage } from '../../firebaseinit';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

function ProductDetailsPage() {
    const [comment, setComment] = useState("")
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [imageList, setImageList] = useState([])
    const { id } = useParams()
    const {user, user2, signedInWithEmail, signedInWithGoogle } = useSelector(userSelect)
    const [loading, setLoading] = useState(true)
    const uploadedListRef = ref(storage, `${user?.uid}/`)

    useEffect(() => {
        const getDocument = async () => {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                setLoading(false)
                setProduct(docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        }

        getDocument()
    }, [id])

    useEffect(() => {
        listAll(uploadedListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })
    }, [uploadedListRef])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(comment, "from handleFormSubmit")
        let commentObject = { Name: user.displayName, comment: comment, Img: imageList[0] }
        console.log(commentObject)
        product.comments.unshift(commentObject)
        const docReference = doc(db, "products", id)
        await updateDoc(docReference, {
            comments: product.comments
        })
        setComment("")
    }

    const handleFormSubmit2 = async (e) => {
        e.preventDefault()
        console.log(comment, "from handleFormSubmit2")
        let commentObject2 = { Name: user2?.displayName, comment: comment, Img: user2?.photoUrl }
        console.log(commentObject2)
        product.comments.unshift(commentObject2)
        const docReference = doc(db, "products", id)
        await updateDoc(docReference, {
            comments: product.comments
        })
        setComment("")
    }

    const nothing = ()=>{
        console.log("some error that's why this runs!")
    }

    const handleDecrease = () => {
        if (quantity === 1) {
            return
        }
        setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        if (quantity === 30) {
            return
        }
        setQuantity(quantity + 1)
    }

    const addToCart = () => {
        let cartItem = JSON.parse(localStorage.getItem("cart"))||[]
        if(cartItem.length !== 0){
           let index =  cartItem.findIndex(item => item.id === id)
           if(index !== -1){
            cartItem[index].quantity += quantity
            cartItem[index].totalPriceOfProduct += quantity*(product.price*83.43).toFixed(0)
           }else{
            cartItem.push({
                title: product.title,
                image: product.image,
                id: id,
                category: product.category,
                price: (product.price*83.43).toFixed(0),
                quantity: quantity,
                totalPriceOfProduct: (product.price*83.43).toFixed(0)*quantity
            })
           }
           localStorage.setItem("cart", JSON.stringify(cartItem));
           let cartForTotal = JSON.parse(localStorage.getItem("cart"))
           const totalPrice = cartForTotal.reduce((acc,currValue)=> acc+ currValue.totalPriceOfProduct,0)
           localStorage.setItem("total", JSON.stringify(totalPrice))
        }else{
            cartItem.push({
                title: product.title,
                image: product.image,
                id: id,
                category: product.category,
                price: (product.price*83.43).toFixed(0),
                quantity: quantity,
                totalPriceOfProduct: (product.price*83.43).toFixed(0)*quantity
            })
            localStorage.setItem("cart", JSON.stringify(cartItem));
            let cartForTotal = JSON.parse(localStorage.getItem("cart"))
            const totalPrice = cartForTotal.reduce((acc,currValue)=> acc+ currValue.totalPriceOfProduct,0)
            localStorage.setItem("total", JSON.stringify(totalPrice))
        }

    };


    return (
        <>
            {loading ? <Loader /> :

                <>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={product.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{product.title} &nbsp; <strong>{product.category}</strong></h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><strong><FaRupeeSign />{(product.price*83.43).toFixed(0)}</strong></p>
                                    <p className="card-text"> {<span>{<FaStar />}</span>}&nbsp; {product.rating.rate}</p>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <button type="button" class="btn btn-danger" onClick={addToCart}>Add to cart</button>
                                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                            <button type="submit" className="btn btn-primary customs" onClick={handleDecrease}>-</button>
                                            <p className="card-text">{quantity}</p>
                                            <button type="submit" className="btn btn-primary customs2" onClick={handleIncrease}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={ signedInWithEmail ? handleFormSubmit : signedInWithGoogle ? handleFormSubmit2 : nothing}>
                        <div class="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="text-help" value={comment}
                                onChange={(e) => { setComment(e.target.value) }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <div>
                        <div class="card">
                            <h2 class="card-header">
                                <strong>Comments</strong>
                            </h2>
                            <div class="card-body">
                                {product.comments.map((doc) => (
                                    <>
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 user-details">
                                            <li className="nav-item">
                                                {<img src={doc.Img} alt="Logo" width="30" height="24" className="d-inline-block align-text-top customClass" />}
                                            </li>
                                            <li className="nav-item">
                                                <strong class="card-title">{doc.Name}</strong>
                                            </li>


                                        </ul>
                                        <p class="card-text">{doc.comment}</p>
                                    </>

                                ))}
                            </div>
                        </div>
                    </div>

                </>

            }
        </>
    )

}
export default ProductDetailsPage