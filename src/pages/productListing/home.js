import { useSelector, useDispatch } from "react-redux";
// importing productSelector from the productReducer
import { productSelector } from "../../redux/productReducer";
// importing asyncThunk() function from the productReducer
import { fetchProductItems } from "../../redux/productReducer";
import "./home.css";
import { useEffect, useRef, useState } from "react";
import Product from "../../components/Product component/product";
import Navbars from "../../components/Navbar/navbar";

export default function Home() {
  // const [product, setProduct] = useState([])
  // destructuring data from the productReducer
  const { data } = useSelector(productSelector);
  const [price, setPrice] = useState(90000);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  // const user = useSelector(userSelect)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [searchedWithPrice, setSearchedWithPrice] = useState(data)
  console.log(searchedWithPrice)

  
  // handling the searched products and setting the search products from data array to searchArray
  function handleSearch() {
    let qr = searchRef.current.value;
    setSearchQuery(qr.toLowerCase());
    // filtring the data array that include searched querry and pushing it to arr
    const arr = data.filter((item) => {
      if (item.title.toLowerCase().includes(searchQuery)) {
        return item;
      }
      return null;
    });
    // setting the searchArray to the array of product searched
    setSearchArray(arr);
  }
  useEffect(() => {
      let priceFilteredArray = data.filter((item) => {
        if (item.price * 81.92 <= price) {
          return item
        }
        return null;
  
      })
      console.log()
      setSearchedWithPrice(priceFilteredArray)
  },[data, price])


  // useEffect to render the all the products from the api
  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  return (
    <>
      <nav className="Navbar">
        <Navbars />
      </nav>
      <div className="search-box-container">
        <input
          className="search-box"
          ref={searchRef}
          type="search"
          placeholder="Search by typing"
          onChange={() => handleSearch()}
        />
      </div>
      <div className="product-and-slidebar-container">
        <div className="sildebar-checkbox-search">
          <div className="slidebar-search">
            <div>
              <label htmlFor="price">Price:{price}</label>
            </div>
            <input
              type="range"
              id="price"
              name="price"
              min="1"
              max="100000"
              value={price}
              step="10"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="products-container">
          {/* Conditional rendering base on the searched product */}
          {!searchQuery
            ? searchedWithPrice.map((item, id) => <Product key={id} product={item} />)
            : searchArray.map((item, id) => (
              <Product key={id} product={item} />
            ))}
          {/* {
            !searchedWithPrice ? data.map((item, id) => <Product key={id} product={item} />)
            :
            searchedWithPrice.map((item,id)=>(<Product key={id} product={item}/>))
          } */}
        </div>
      </div>
    </>
  );
}
