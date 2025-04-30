import React, { useEffect, useState } from 'react'
import Productcard from '../components/Productcard'
import image from "./../assets/i.png"
import i from "../assets/d.jpeg"
import R from "../assets/R.png"
import { getAllproducts } from '../services/productServices'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

function Home() {
  
  const user = useSelector((state) => state.authReducer.userData);
    const [products,setProducts] = useState([])
    useEffect(() =>
        {
          const fetchAllproducts = async() =>
          {
           const data = await getAllproducts()
           setProducts(data.products)
          }

          fetchAllproducts()
        },[])
  return (
    <div className='bg-[#F4F4F4] h-screen overflow-auto'>
      <Navbar/>

<h1>Sneakers</h1>

<div className=' flex gap-10 flex-wrap justify-center mt-20 mb-10'>




{ products.map((each) =>
  <Productcard   isadmin={user?.role === "admin" }   key={each._id}   product={each} image={each.image} name={each.productName} price={each.price} description={each.description} />
)}
  
  
       
</div>
        
    </div>
  )
}

export default Home