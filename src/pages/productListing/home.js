import { useSelector, useDispatch } from "react-redux";
// importing productSelector from the productReducer
import { productSelector } from "../../redux/productReducer";
// importing asyncThunk() function from the productReducer
import { fetchProductItems } from "../../redux/productReducer";
import "./home.css";
import { useEffect } from "react";
import Product from "../../components/Product component/product";
// import { userSelect } from "../../redux/signupReducer";

export default function Home({ searchArray, searchQuery }) {
  // destructuring data from the productReducer
  const { data } = useSelector(productSelector);

  const dispatch = useDispatch();


  // useEffect to render the all the products from the api
  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);


  return (
    <>
      <div className="product-and-slidebar-container">
        <div className="products-container">
          {!searchQuery
            ? data.map((item, id) => <Product key={id} product={item} />)
            : searchArray.map((item, id) => (
              <Product key={id} product={item} />
            ))}
        </div>
      </div>
    </>
  );
}
