import React, { useEffect, useState } from 'react'
import Productcard from '../components/Productcard'
import Navbar from '../components/Navbar'
import { getAllproducts } from '../services/productServices'
import { useSelector } from 'react-redux'

function Home() {
  const user = useSelector((state) => state.authReducer.userData);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllproducts = async () => {
      try {
        const data = await getAllproducts()
        setProducts(data.products)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllproducts()
  }, [])

  return (
    <div className='bg-[#F4F4F4] h-screen overflow-auto'>
      <Navbar />
      <h1>Sneakers</h1>

      {loading ? (
        <div className='text-center mt-20 text-lg font-semibold'>Loading products...</div>
      ) : (
        <div className='flex gap-10 flex-wrap justify-center mt-20 mb-10'>
          {products.map((each) => (
            <Productcard
              isadmin={user?.role === "admin"}
              key={each._id}
              product={each}
              image={each.image}
              name={each.productName}
              price={each.price}
              description={each.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
