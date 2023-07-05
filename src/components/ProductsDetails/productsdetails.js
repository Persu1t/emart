import { userSelect } from "../../redux/signupReducer"
import { productSelector } from "../../redux/productReducer";
import { useSelector } from "react-redux";
import "./productsdetails.css"
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseinit"
import { useEffect, useState } from "react";

function ProductDetailsPage({ closeModal }) {
    const [comment, setComment] = useState("")
    const [commented, setCommented] = useState([])
    const user = useSelector(userSelect)
    console.log("user", user);
    const { productsDetails } = useSelector(productSelector)
    console.log("productsDetails", productsDetails[0]);
    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "productItems"), (snapShot)=>{
                const fetchingCommets = snapShot.docs.map((doc)=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log("fetching", fetchingCommets)
            setCommented(fetchingCommets)
        })
        console.log(unsub)
    },[])

    useEffect(()=>{
        document.body.style.overflowY = 'hidden';
        return()=>{document.body.style.overflowY = 'visible';}
    },[])

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        const docRef = await addDoc(collection(db, "productItems"),{
            comments: comment,
            User: user.displayName
        })
        console.log("docRef", docRef.id)
        setComment("")
    }


    return(
        <>
            <div className="modal-wrapper" onClick={closeModal}></div>
                {
                    <div className="modal-container">
                        <div className="productAllDetails">
                            <div className="img-container">
                                <img src={productsDetails[0].image} alt={productsDetails[0].title}/>
                            </div>
                            <div className="product-details">
                                <h4>{productsDetails[0].title}</h4>
                                <strong>{productsDetails[0].category}</strong>
                                <p>{productsDetails[0].description}</p>
                                <p>₹{((productsDetails[0].price)*81.92).toFixed(2)}</p>
                                <p>{productsDetails[0].rating.rate}</p>
                                <div className="add-to-cart-btn-container">
                                    <button onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        
                        </div>
                        <div className="comment-section-contsiner">
                            <form onSubmit={handleFormSubmit}>
                                <input type="text" 
                                       placeholder="Add Comment" 
                                       className="comment-input"
                                       value={comment}
                                       onChange={(e)=>{setComment(e.target.value)}}/>
                                <input type="submit" className="submit-btn"/>
                            </form>

                        </div>
                        <div className="comment-holder">
                            {commented.map((doc)=>(
                                <div className="Comment-section">
                                    <strong>{doc.User}</strong>
                                    <p className="comment">{doc.comments}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                }
        </>
    )

}
export default ProductDetailsPage