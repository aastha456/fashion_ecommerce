import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import plusButton from "../assets/ei_plus.svg";
import { Link } from "react-router-dom";
import heartIcon from "../assets/heart1.svg";
import heartIconFilled from "../assets/heart2.svg";

const Search = () => {
  // Removed separate liked state since we now rely on wishlistItems from context
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [recommendedImages, setRecommendedImages] = useState([]); // State to hold recommended image

  const {
    products,
    search,
    setSearch,
    currency,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useContext(ShopContext);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Send the image to the backend for recommendations
      const response = await fetch("http://localhost:5001/recommend", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Recommended Images:", data.recommended);
      // Update the recommended images state
      setRecommendedImages(data.recommended);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  // Toggle wishlist for each product/recommended item
  const handleWishlistToggle = (product) => {
    // Use the product's size if available; otherwise default to "default"
    const size = product.size || "default";
    const isWishlisted = wishlistItems.some(
      (item) => item.id === product.id && item.size === size
    );

    if (isWishlisted) {
      removeFromWishlist(product.id, size);
    } else {
      addToWishlist(product.id, size);
    }

    // Optionally notify other parts of the app about wishlist changes
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: wishlistItems,
      })
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center px-4 py-10">
      {/* Search Bar with Upload */}
      <div className="relative flex items-center px-4 py-2 w-full max-w-md border-b border-gray-400">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="outline-none w-full text-sm md:text-base text-center bg-transparent placeholder-gray-500"
          value={search}
          onChange={handleInputChange}
        />
        <img
          src={plusButton}
          className="ml-2 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xl font-bold hover:bg-gray-100 rounded-full transition-colors"
          onClick={togglePopup}
        />

        {showPopup && (
          <div className="absolute top-12 right-0 bg-white p-4 w-52 z-10 shadow">
            <p className="text-sm text-gray-700 mb-2">Upload image to search</p>
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="block text-sm text-gray-600 cursor-pointer hover:underline"
            >
              Choose File
            </label>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {selectedFile && (
        <button
          className="mt-4 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
          onClick={handleUpload}
        >
          Search by Image
        </button>
      )}

      {/* Recommended Images Section */}
      {recommendedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Recommended Items</h3>
          <div className="w-full max-w-6xl mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedImages.map((item, index) => (
              <div key={index} className="relative group overflow-hidden">
                <Link to={`/product/${item.id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <button
                  className="absolute top-2 right-2 text-gray-700"
                  onClick={() =>
                    handleWishlistToggle({ ...item, size: item.size || "default" })
                  }
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white">
                    <img
                      src={
                        wishlistItems.some(
                          (w) =>
                            w.id === item.id &&
                            w.size === (item.size || "default")
                        )
                          ? heartIconFilled
                          : heartIcon
                      }
                      alt="Heart"
                      className="w-5 h-5"
                    />
                  </div>
                </button>
                <div className="mt-3 text-center">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-lg font-medium">
                    {currency}
                    {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Product Results (Limit to 8) */}
      <div className="w-full max-w-6xl mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 8).map((item) => (
            <div key={item.id} className="relative group overflow-hidden">
              <Link to={`/product/${item.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt={item.name}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>
              <button
                className="absolute top-2 right-2 text-gray-700"
                onClick={() =>
                  handleWishlistToggle({ ...item, size: item.size || "default" })
                }
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white">
                  <img
                    src={
                      wishlistItems.some(
                        (w) =>
                          w.id === item.id &&
                          w.size === (item.size || "default")
                      )
                        ? heartIconFilled
                        : heartIcon
                    }
                    alt="Heart"
                    className="w-5 h-5"
                  />
                </div>
              </button>
              <div className="mt-3 text-center">
                <p className="text-sm">{item.name}</p>
                <p className="text-lg font-medium">
                  {currency}
                  {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full mt-10">
            No results found for "<span className="font-medium">{search}</span>"
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;