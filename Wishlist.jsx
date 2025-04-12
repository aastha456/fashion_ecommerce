import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import removeIcon from "../assets/material-symbols-light_delete-outline.svg";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const {
    wishlistItems,
    currency,
    removeFromWishlist,
    addToCart,
  } = useContext(ShopContext);

  const handleAddToCart = (itemId, size) => {
    addToCart(itemId, size); // Add item to cart from wishlist
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 font-sans">
      {/* Header */}
      <header className="text-center pt-20">
        <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-15">
            <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
            <p className="text-gray-500 mt-2">
              Browse products and add them to your wishlist!
            </p>
            <Link to="/collection" className="text-gray-800 hover:underline mt-4 inline-block">
              Go back to shop
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Items */}
            <div className="space-y-4">
              {wishlistItems.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-xs sm:text-lg font-medium">{item.name}</h3>
                        <div className='flex items-center gap-5 mt-2'>
                          <p>{currency}{item.price.toFixed(2)}</p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(item.id, item.size)}
                        className="text-white bg-black py-1 px-3 rounded hover:bg-gray-700 transition-colors"
                      >
                        Add to Cart
                      </button>

                      {/* Remove from Wishlist Button */}
                      <button
                        onClick={() => removeFromWishlist(item.id, item.size)}
                        className="text-gray-500 hover:text-black p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <img
                          src={removeIcon}
                          alt="Remove item"
                          className="w-5 h-5 sm:w-6 sm:h-6"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
