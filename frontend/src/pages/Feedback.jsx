  import React, { useEffect, useState } from 'react';
  import ProductDetails from '../components/ProductDetails';
  import { useSelector } from 'react-redux';
  import Feedbackform from '../components/Feedbackform';
  import FeedbackCard from '../components/FeedbackCard';
  import Navbar from '../components/Navbar';
  import { getProductFeedback } from '../services/productServices';

  function Feedback() {
    const selectedProduct = useSelector((state) => state.productReducer.selectedProduct);

    const [feedback, setFeedback] = useState([]);
    const [sortOrder, setSortOrder] = useState('default');

    useEffect(() => {
      const fetchProductFeedback = async () => {
        const results = await getProductFeedback(selectedProduct._id);
        setFeedback(results.data);
      };
      fetchProductFeedback();
    }, []);

    const sortedFeedback = [...feedback].sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.rating - b.rating;
      if (sortOrder === 'highToLow') return b.rating - a.rating;
      if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

    return (
      <>
        <Navbar />
        <div className="bg-gray-200 overflow-auto h-screen">
          <div className="flex justify-center space-x-4 mt-20">
            <div className="w-1/3">
              <ProductDetails name={selectedProduct.productName} price={selectedProduct.price} image={selectedProduct.image} description={selectedProduct.description} />
            </div>
            <div className="w-2/3">
              <Feedbackform
                onSuccess={(feedbackData) => setFeedback((prev) => [...prev, feedbackData])}
                
              />
            </div>
          </div>


          <div className="flex justify-center mt-10 flex-col items-center">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback for this Product</h2>
  
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="p-2 rounded-lg shadow bg-white text-gray-800"
  >
    <option value="default">Sort by: Default</option>
    <option value="lowToHigh">Low to High Rating</option>
    <option value="highToLow">High to Low Rating</option>
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
</div>


        
          <div className="flex flex-col gap-2 items-center mt-6">
            {
              console.log(sortedFeedback)
            }
            {sortedFeedback.map((each) => (
              <FeedbackCard
                key={each._id}
                feedback={each.feedback}
                rating={each.rating}
                createdAt={each.createdAt}  
                createdBy={each.createdBy}
                image={each.image}
                adminResponse={each.response}
                responsedBy={each.responsedBy}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  export default Feedback;
