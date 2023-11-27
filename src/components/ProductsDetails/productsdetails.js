import { userSelect } from "../../redux/signupReducer"
import { useSelector } from "react-redux";
import "./productsdetails.css"
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseinit";
import Loader from "../../pages/loader/loader"
function ProductDetailsPage() {
    const [comment, setComment] = useState("")
    const [product, setProduct] = useState({})
    const {id} = useParams()
    const user = useSelector(userSelect)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getDocument = async()=>{
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
    },[id])

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        console.log(comment)
        let commentObject = {Name: user.displayName, comment:comment}
        product.comments.unshift(commentObject)
        const docReference = doc(db, "products", id)
        await updateDoc(docReference,{
            comments: product.comments
        })
        setComment("")
    }


    return(
        <>
        {loading ? <Loader/> :
                
                    <div className="modal-container">
                        <div className="productAllDetails">
                            <div className="img-container">
                                {console.log(product)}
                                <img src={product.image} alt={product.title}/>
                            </div>
                            <div className="product-details">
                                <h4>{product.title}</h4>
                                <strong>{product.category}</strong>
                                <p>{product.description}</p>
                                <p>₹{((product.price)*81.92).toFixed(2)}</p>
                                {/* <p>{product.rating.count}</p> */}
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
                            {product.comments.map((doc)=>(
                                <div className="Comment-section">
                                    <strong>{doc.Name}</strong>
                                    <p className="comment">{doc.comment}</p>
                                </div>
                            ))}
                            {console.log(product.comments)}
                        </div>

                    </div>
                
        }
        </>
    )

}
export default ProductDetailsPage