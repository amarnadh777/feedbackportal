import React from 'react';

function ProductDetails({name,price,image,description}) {
  return (
    <div className="flex justify-center p-6">
      <div className="max-w-[28em] rounded-lg shadow-lg bg-white">

        <img
          src={image}
          alt="Product"
          className="w-full h-48  rounded-t-lg"
        />

   
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 mb-4">
            {
              description
            }
          </p>


          <h3 className="text-lg font-bold text-green-600 mb-4">₹ {price}</h3>
         
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
