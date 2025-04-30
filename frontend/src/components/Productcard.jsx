import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedProduct } from '../redux/productSlice';

function Productcard({ price, name, description, image, product, isadmin }) {
  const dispatch = useDispatch();
  const [showFull, setShowFull] = useState(false);

  const handleSelect = () => {
    dispatch(selectedProduct(product));
  };

  const toggleDescription = () => {
    setShowFull(!showFull);
  };

  return (
    <div className="bg-white w-72 h-[30em] rounded-2xl p-4 shadow-md hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <img
          src={image || "/assets/default-product.png"}
          alt="Product"
          className="w-full h-44 rounded-lg"
        />

        <p className="mt-4 font-bold text-lg">{name}</p>

        <p className="mt-2 text-gray-600 text-sm">
          {showFull ? description : description.slice(0, 200)}
          ...
        </p>

        <p className="mt-2 font-bold text-lg">₹ {price}</p>
      </div>

      <div className="mt-4 flex justify-center">
        {isadmin ? (
          <Link to="/admin/response">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
              onClick={handleSelect}
            >
              View & respond to feedback
            </button>
          </Link>
        ) : (
          <Link to="/feedback">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
              onClick={handleSelect}
            >
              Give feedback
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Productcard;
