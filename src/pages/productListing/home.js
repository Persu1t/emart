import { useSelector, useDispatch } from "react-redux";
// importing productSelector from the productReducer
import { productSelector } from "../../redux/productReducer";
// importing asyncThunk() function from the productReducer
import { fetchProductItems } from "../../redux/productReducer";
import "./home.css";
import { useEffect, useState } from "react";
import Product from "../../components/Product component/product";
// import { userSelect } from "../../redux/signupReducer";

export default function Home({ searchArray, searchQuery }) {
  // destructuring data from the productReducer
  const { data } = useSelector(productSelector);
  // const user = useSelector(userSelect)
  // const [imageList, setImageList] = useState([])
  // const uploadedListRef = ref(storage, `${user.uid}/`)
  console.log(data)
  const dispatch = useDispatch();


  // useEffect to render the all the products from the api
  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  // useEffect(()=>{
  //   listAll(uploadedListRef).then((response)=>{
  //     response.items.forEach((item)=>{
  //       getDownloadURL(item).then((url)=>{
  //         setImageList((prev)=> [...prev, url])
  //       })
  //     })
  //   })
  // })

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
