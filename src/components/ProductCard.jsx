// ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4" />
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-yellow-500">Rating: {product.rating}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
