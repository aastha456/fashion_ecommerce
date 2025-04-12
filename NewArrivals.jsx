// src/components/NewArrivals.js
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from "../assets/image.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import { ShopContext } from '../context/ShopContext';

const NewArrivals = ({handleViewNewArrivals}) => {
  const { products } = useContext(ShopContext);
  const { currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() =>{
      // Ensure products is an array and has content
      if (Array.isArray(products) && products.length > 0) {
        setLatestProducts(products.slice(0, 3));
      }
  }, [products]);

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-semibold">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 mt-8">
        {
        latestProducts.map((item, index) => (
          <div key={index} className="text-center relative">
            <Link to={`/product/${item.id}`}>
              <div className="group overflow-hidden">
                <img
                  src={item.image && item.image[0] ? item.image[0] : "/path/to/default/image.png"}
                  alt={item.name}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
            <div className="mt-2">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">{currency}{item.price.toFixed(2)}</p>
            </div>
          </div>
        ))
        }
      </div>
      <button
        className="mt-6 border border-gray-900 px-6 py-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white transition"
        onClick={handleViewNewArrivals}
      >
        View More
      </button>
    </section>
  )
};

export default NewArrivals;

