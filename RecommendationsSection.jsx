import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import heartIcon from "../assets/heart1.svg";
import heartIconFilled from "../assets/heart2.svg";
import { Link } from "react-router-dom";

function RecommendationsSection({ currentProductId, category }) {
  const {
    products,
    currency,
    wishlistItems,
    addToWishlist,
    removeFromWishlist
  } = useContext(ShopContext);

  useEffect(() => {
    console.log('Current Category:', category); // Debugging category value
  }, [category]);

  // Get recommended products based on the same category, excluding the current product
  const recommendedProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 8); // Limit to top 8 products

  return (
    <div className="mt-16">
      {/* Section Title */}
      <h2 className="text-xl text-center mb-8">You might also like</h2>

      {/* Recommended Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => {
            const isWishlisted = wishlistItems.some(
              (item) => item.id === product.id
            );

            const handleWishlistToggle = () => {
              if (isWishlisted) {
                removeFromWishlist(product.id, product.size || 'default');
              } else {
                addToWishlist(product.id, product.size || 'default');
              }
            };

            return (
              <div key={product.id} className="relative group">
                {/* Product Image with Link */}
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Like Button */}
                <button
                  className="absolute top-2 right-2 text-gray-700 z-10"
                  onClick={handleWishlistToggle}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white">
                    <img
                      src={isWishlisted ? heartIconFilled : heartIcon}
                      alt="Heart"
                      className="w-5 h-5"
                    />
                  </div>
                </button>

                {/* Product Info */}
                <div className="mt-2 text-center">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm font-medium">
                    {currency}
                    {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationsSection;
