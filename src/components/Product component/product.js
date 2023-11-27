
import { Link } from "react-router-dom";
// import ProductDetailsPage from "../ProductsDetails/productsdetails";
import "./product.css"
import { FaStar } from "react-icons/fa";

export default function Product({ product }) {

    return (
        <>
            
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <Link to={`/${product.productId}`} style={{ textDecoration: "none"}}><img src={product.image} className="img-fluid rounded-start image" alt={product.title} /></Link>
                        </div>
                        <div className="col-md-8 card-body-container">
                            <div className="card-body">
                                <Link to={`/${product.productId}`} style={{ color: "black", textDecoration: "none"}}><h5 className="card-title">{product.title}</h5></Link>
                                <p class="card-text"> {<span>{<FaStar />}</span>}&nbsp; {product.rating.rate}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>


    )
}