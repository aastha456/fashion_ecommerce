import React, { useState, useRef, useContext } from 'react'; 
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import heartIcon from "../assets/heart1.svg";
import heartIconFilled from "../assets/heart2.svg";
import { ShopContext } from '../context/ShopContext';
import RecommendationsSection from '../components/RecommendationsSection';

function ProductDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1); 
  const [isProductLiked, setIsProductLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbnailRef = useRef(null); 
  const { products, currency, addToCart , addToWishlist } = useContext(ShopContext); 

  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Product not found</div>;
  }

  // // Check if the product is in the wishlist
  // const initialWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  // const isInWishlistInitially = initialWishlist.some(item => item.id === parseInt(id));

  // useEffect(() => {
  //   if (id) {
  //     setIsProductLiked(isInWishlistInitially);
  //   }
  // }, [id, isInWishlistInitially]);

  const toggleProductLike = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
    const existingIndex = wishlist.findIndex(item => item.id === product.id);
  
    let updatedWishlist;
  
    if (existingIndex !== -1) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      setIsProductLiked(false);
    } else {
      updatedWishlist = [...wishlist, { id: product.id, size: selectedSize }];
      setIsProductLiked(true);
    }
  
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  
    if (addToWishlist) {
      addToWishlist(product.id, selectedSize); // Modify as needed for global context
    }
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      thumbnailRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const productImages = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <a href="/" className="text-gray-500 text-sm mb-4 inline-block hover:underline">
          ← Back to home
        </a>
      </div>

      {/* Product Detail Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="w-full h-[800px] object-cover"
            />
            {/* Navigation Buttons */}
            {productImages.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : productImages.length - 1))}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={() => setSelectedImage(prev => (prev < productImages.length - 1 ? prev + 1 : 0))}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            {/* Like Button */}
            <button className="absolute top-2 right-2 text-gray-700" onClick={toggleProductLike}>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white">
                <img src={isProductLiked ? heartIconFilled : heartIcon} alt="Heart" className="w-5 h-5" />
              </div>
            </button>
          </div>
          
          {/* Thumbnail Carousel */}
          {productImages.length > 1 && (
            <div className="relative mt-4">
              <button 
                onClick={() => scrollThumbnails('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div 
                ref={thumbnailRef}
                className="flex space-x-2 overflow-x-auto scrollbar-hide py-2"
                style={{ scrollbarWidth: 'none' }}
              >
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 cursor-pointer border-2 ${
                      selectedImage === index ? "border-black" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollThumbnails('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-medium mb-2">{product.name}</h1>
          <p className="text-xl mb-1">{currency}{product.price.toFixed(2)}</p>
          <p className={`text-sm mb-4 ${product.availability === "In Stock" ? "text-green-600" : "text-red-600"}`}>
            {product.availability || "In Stock"}
          </p>

          {/* Color and Size Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <p className="text-sm mb-2">Color</p>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-6 rounded-full border border-gray-300" 
                    style={{ backgroundColor: color }} 
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <p className="text-sm mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size} 
                    className={`w-10 h-10 border flex items-center justify-center ${
                      selectedSize === size ? "border-black" : "border-gray-300"
                    }`} 
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Details */}
          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm mb-2">Quantity</p>
            <div className="flex items-center border border-gray-300 w-fit rounded-md px-2 py-1">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-2 text-lg hover:bg-gray-200 transition focus:outline-none focus:ring-0 active:outline-none"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="px-6 py-2 text-lg font-medium">{quantity}</div>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-lg hover:bg-gray-200 transition focus:outline-none focus:ring-0 active:outline-none"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Details */}
          {product.details && product.details.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Details</h3>
              <ul className="text-sm space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index}>• {detail}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <button onClick={() => addToCart(product.id, selectedSize)} className="px-6 py-3 rounded-md border border-black bg-white text-black flex-1 hover:bg-gray-100 transition">
                Add to bag
              </button>
              <button 
                onClick={toggleProductLike}
                className={`px-6 py-3 rounded-md flex-1 transition ${
                  isProductLiked 
                    ? "bg-gray-200 text-black border border-black" 
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isProductLiked ? "Remove from wishlist" : "Add to wishlist"}
              </button>
            </div>
            <button className="w-full py-3 rounded-md bg-black text-white hover:bg-gray-800 transition">
              Buy it now
            </button>
          </div>
        </div>
      </div>
      {/* Recommendations Section */}
      <RecommendationsSection currentProductId={product.id} category={product.category} />
    </div>
  );
}

export default ProductDetailPage;
