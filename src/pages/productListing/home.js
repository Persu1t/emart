import { useSelector, useDispatch } from "react-redux";
// importing productSelector from the productReducer
import { productSelector } from "../../redux/productReducer";
// importing asyncThunk() function from the productReducer
import { fetchProductItems } from "../../redux/productReducer";
import "./home.css";
import { useEffect } from "react";
import Product from "../../components/Product component/product";

export default function Home({ searchArray, searchQuery }) {
  // destructuring data from the productReducer
  const { data } = useSelector(productSelector);
  console.log(data)
  const dispatch = useDispatch();


  // useEffect to render the all the products from the api
  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  return (
    <>
      <div className="product-and-slidebar-container">
        <div className="products-container">
          {/* Conditional rendering base on the searched product */}
          {/* {data.map((product)=> <Product key={product.id} product={product}/>)} */}
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
