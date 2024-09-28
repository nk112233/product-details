import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { setCategories, setProducts } from '../redux/actions';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  const selectedCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products/categories');
        dispatch(setCategories(res.data));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://dummyjson.com/products`;
        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${(page - 1) * limit}`;
        }
        if (selectedCategory) {
          url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${(page - 1) * limit}`;
        }
        const { data } = await axios.get(url);
        dispatch(setProducts(data.products));
        setTotalProducts(data.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchQuery, page, dispatch]);

  const handleCategoryChange = (category) => {
    setSearchParams({ category });
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchParams({ search: e.target.value });
    setPage(1);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md mx-1 ${page === i ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-slate-300 p-6">
      <Link to="/" className="text-3xl font-bold my-16">Product Store</Link>
      <input
        type="text"
        placeholder="Search products"
        onChange={handleSearchChange}
        value={searchQuery}
        className="border p-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
          className="border p-2 rounded-md w-full"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
      

      {selectedCategory && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="bg-gray-300 px-3 py-1 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          {renderPaginationNumbers()}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="bg-gray-300 px-3 py-1 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
