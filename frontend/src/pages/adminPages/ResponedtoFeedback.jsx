import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import FeedbackCard from '../../components/FeedbackCard';
import { getProductFeedback } from '../../services/productServices';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import ProductDetails from '../../components/ProductDetails';

function ResponedtoFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const selectedProduct = useSelector((state) => state.productReducer.selectedProduct);

  const fetchFeedbacks = async () => {
    try {
      const results = await getProductFeedback(selectedProduct._id);
      setFeedbacks(results.data);
   
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.rating - b.rating;
    if (sortOrder === 'highToLow') return b.rating - a.rating;
    if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  const handleResponseAdded = () => {
    fetchFeedbacks()
  };

  return (
    <div>
    <Navbar />
    <div className="bg-gray-200 overflow-auto min-h-screen pt-20">
  
      <div className="flex justify-center mt-6">
        <h1 className="text-3xl font-bold mb-6">All Feedbacks of this product (Admin)</h1>
      </div>
  
      <ProductDetails 
        name={selectedProduct.name} 
        price={selectedProduct.price} 
        image={selectedProduct.image}
        description={selectedProduct.description}
      />
  
      <div className="flex justify-center mt-4">
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
  
      <div className="flex flex-col gap-4 items-center mt-6 pb-10">
        {loading ? (
          <CircularProgress />
        ) : sortedFeedbacks.length === 0 ? (
          <p className="text-gray-600">No feedback found.</p>
        ) : (
          sortedFeedbacks.map((item) => (
            <FeedbackCard
              key={item._id}
              feedback={item.feedback}
              feedbackId={item._id}
              rating={item.rating}
              createdAt={item.createdAt}
              createdBy={item.createdBy}
              image={item.image}
              adminResponse={item.response}
              responsedBy={item.responsedBy}
              isAdmin={true}
              onResponseAdded={handleResponseAdded}
            />
          ))
        )}
      </div>
  
    </div>
  </div>
  );
}

export default ResponedtoFeedback;
