import React, { useState } from "react";

const StyleGuide = () => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        Find Your Perfect Style Based on Your Body Type
      </h1>
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-8">
        {/* Left: Image Upload Section */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="w-full border-2 border-dashed border-gray-400 rounded-lg p-6 flex items-center justify-center h-64 bg-gray-100">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <p className="text-gray-600 text-sm text-center">
                Upload your image here
              </p>
            )}
          </div>

          <label className="mt-4 w-full bg-black text-white text-center py-2 px-4 rounded cursor-pointer hover:bg-gray-700">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            Upload Image
          </label>

          {imageUploaded && (
            <p className="text-center text-sm text-green-600 mt-3 font-medium">
              Upload Successful
            </p>
          )}
        </div>

        {/* Right: Recommendations Section */}
        {imageUploaded && (
          <div className="flex flex-col w-full md:w-2/3">
            <h2 className="text-lg font-light text-gray-800 mb-3 text-center md:text-left">
              You have a Square Body Type
            </h2>
             {/* Centered "Our Recommendations" */}
             <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
              Our Recommendations
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Adjusted shape of recommendation boxes */}
              {[...Array(9)].map((_, index) => (
                <div key={index} className="w-full h-60 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleGuide;
