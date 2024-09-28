import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <button
        onClick={() => navigate(-1)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Carousel showThumbs={true} infiniteLoop={true} autoPlay={false} showStatus={false}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`${product.title} image ${index + 1}`}
                  className="rounded-lg w-full h-auto object-cover shadow-lg"
                  loading="lazy" 
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center justify-between mb-4">
            <p className="text-3xl font-semibold text-green-600">${product.price.toFixed(2)}</p>
            <p className="text-yellow-500 text-lg font-medium">⭐ {product.rating}</p>
          </div>

          <div className="text-gray-700 mb-6">
            <p className={`mb-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? `In Stock: ${product.stock} items` : 'Out of Stock'}
            </p>
            <p className="mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
            <p className="mb-2">Category: <span className="font-medium">{product.category}</span></p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
            <h3 className="text-xl font-semibold mb-2">Warranty & Shipping</h3>
            <p className="mb-1">Warranty: {product.warrantyInformation || '1 Year Standard Warranty'}</p>
            <p>Shipping: {product.shippingInformation || 'Free Standard Shipping'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
