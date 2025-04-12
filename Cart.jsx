import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import removeIcon from "../assets/material-symbols-light_delete-outline.svg";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { 
    cartItems, 
    products, 
    currency, 
    removeFromCart, 
    updateCartItem 
  } = useContext(ShopContext);

  const cartList = [];

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      const product = products.find((p) => p.id.toString() === productId);

      if (product) {
        cartList.push({
          ...product,
          size,
          quantity,
        });
      }
    }
  }

  const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, size, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1); // Ensure quantity is at least 1
    updateCartItem(itemId, size, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 font-sans">
      {/* Header */}
      <header className="text-center pt-20">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center">
        {cartList.length === 0 ? (
          <div className="text-center py-15">
            <p className="text-gray-600 text-lg">Your shopping cart is empty.</p>
            <p className="text-gray-500 mt-2">
              Add some products to your cart to get started!
            </p>
            <Link to="/collection" className="text-gray-800 hover:underline mt-4 inline-block">
              Go back to shop
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartList.map((item, index) => (
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
                      <input 
                        className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center'
                        type="number" 
                        min="1" 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, item.size, e.target.value)}
                      />
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
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
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-medium">Total:</span>
                <span className="font-semibold">
                  {currency} {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            {cartList.length > 0 && (
              <div className="mt-6">
                <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ShoppingCart;