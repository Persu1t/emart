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
  console.log(data)
  const dispatch = useDispatch();

  const [allData, setAllData] = useState(true)
  const [womenData, setWomenData] = useState([])
  const [mensData, setmensData] = useState([])
  const [electronicData, setElectronicData] = useState([])
  const [jwelleryData, setJwelleryData] = useState([])


  // useEffect to render the all the products from the api
  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  const handleChangeElectronic = (value)=>{
    setAllData(false)
    setWomenData([])
    setJwelleryData([])
    setmensData([])
    setElectronicData(data.filter((obj)=> obj.category === value))
  }

  const handleChangeMensWear = (value)=>{
    setAllData(false)
    setElectronicData([])
    setWomenData([])
    setJwelleryData([])
    setmensData(data.filter((obj)=> obj.category === value))
  }

  const handleChangeWomensWear = (value)=>{
    setAllData(false)
    setElectronicData([])
    setJwelleryData([])
    setmensData([])
    setWomenData(data.filter((obj)=> obj.category === value))
  }

  const handleChangeJwelery = (value)=>{
    setAllData(false)
    setElectronicData([])
    setmensData([])
    setWomenData([])
    setJwelleryData(data.filter((obj)=> obj.category === value))
  }

  const handleAllChange = ()=>{
    setElectronicData([])
    setJwelleryData([])
    setWomenData([])
    setmensData([])
    setAllData(true)
  }




  return (
    <>
      <div className="product-and-slidebar-container">
        <div className="products-filter card mb-3">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked  onChange={handleAllChange}/>
            <label class="form-check-label" for="flexRadioDefault2">
              All
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={()=>handleChangeElectronic("electronics")}/>
            <label class="form-check-label" for="flexRadioDefault1">
              Electronic
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={()=>handleChangeMensWear("men's clothing")} />
            <label class="form-check-label" for="flexRadioDefault2">
              Mens Wear
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={()=>handleChangeWomensWear("women's clothing")}/>
            <label class="form-check-label" for="flexRadioDefault2">
              Womens Wear
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={()=>handleChangeJwelery("jewelery")}/>
            <label class="form-check-label" for="flexRadioDefault2">
              Jwelery
            </label>
          </div>
        </div>
        <div className="products-container">
          {allData === false && electronicData.length!== 0 ? electronicData.map((item, id) =><Product key={id} product={item}/>) : mensData.length !== 0 ?mensData.map((item, id)=> <Product key={id} product={item} />) : womenData.length !== 0 ? womenData.map((item, id)=> <Product key={id} product={item} />) :jwelleryData.length!== 0 ? jwelleryData.map((item, id)=> <Product key={id} product={item} />) : allData && !searchQuery
            ? data.map((item, id) => <Product key={id} product={item} />)
            : searchArray.map((item, id) => (
              <Product key={id} product={item} />
            ))}
        </div>
      </div>
    </>
  );
}
