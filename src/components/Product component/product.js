import { useDispatch } from "react-redux";
// importing action from cart reducer
import { actions } from "../../redux/cartReducer";
// toast imported
import { toast } from 'react-toastify';
import "./product.css"
export default function Product({ product }){
    // using dispatch method
    const dispatch = useDispatch()
    // function handle click for adding products to the cart
    const handleClick = ()=>{
        dispatch(actions.addProducts(product))
        toast.success("Product added. If you want to add this item more click on button again")
    }
    return(
        <>
        <div className="productDiv">
            <div className="product-image">
                {/* image of the product */}
                <img className="image" src={product.image} alt="" />
            </div>
            {/* product title */}
            <h3 className="product-info">{product.title.slice(0, 35)}+...</h3>
            {/* product price */}
            <h4 className="product-info">₹{parseInt(product.price * 81.92)}</h4>
            {/* add to cart button */}
            <button className="add-to-cart-btn" onClick={handleClick}>
                Add to Cart
            </button>
        </div>
        </>
    )
}