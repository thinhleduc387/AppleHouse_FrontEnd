import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaCloudUploadAlt,
  FaLink,
  FaChevronDown,
} from "react-icons/fa";
import { getImageLink } from "../../../config/api";
import Loading from "../../../component/Loading";

const MoreImagesUpload = ({ productData, setProductData }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageUrls, setImageUrls] = useState(""); // For multiple URLs input

  useEffect(() => {
    if (productData.more_imgs && productData.more_imgs.length > 0)
      setPreviewUrls(productData.more_imgs);
  }, []);

  const validateImageCount = (count) => {
    if (count < 4) {
      setError("Bạn cần tải lên ít nhất 4 ảnh.");
    } else {
      setError(""); // Clear error if enough images
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      const updatedPreviewUrls = [...previewUrls, ...newPreviewUrls];
      setPreviewUrls(updatedPreviewUrls); // Update preview URLs

      setIsLoading(true); // Bắt đầu loading
      try {
        const responses = await Promise.all(
          files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await getImageLink(formData);
            return response.metadata.image_url; // Assuming API returns this field
          })
        );

        const updatedMoreImgs = [
          ...(productData.more_imgs || []),
          ...responses,
        ];
        setProductData((prev) => ({
          ...prev,
          more_imgs: updatedMoreImgs,
        }));

        // Validate image count
        validateImageCount(updatedPreviewUrls.length);
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    }
  };

  const handleRemoveImage = (index, event) => {
    event.preventDefault(); // Ngăn hành vi mặc định của button

    const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);
    const updatedMoreImgs = productData.more_imgs.filter((_, i) => i !== index);

    setPreviewUrls(updatedPreviewUrls);
    setProductData((prev) => ({
      ...prev,
      more_imgs: updatedMoreImgs,
    }));

    // Validate image count
    validateImageCount(updatedPreviewUrls.length);
  };

  const handleUrlUpload = async () => {
    if (!imageUrls.trim()) return;

    const urls = imageUrls.split("\n").filter((url) => url.trim());
    if (urls.length === 0) return;

    setIsLoading(true);
    try {
      setPreviewUrls((prev) => [...prev, ...urls]);
      setProductData((prev) => ({
        ...prev,
        more_imgs: [...(prev.more_imgs || []), ...urls],
      }));
      validateImageCount(previewUrls.length + urls.length);
      setImageUrls(""); // Clear input
      setShowDropdown(false);
    } catch (error) {
      console.error("Error uploading images from URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <h2 className="text-xl font-bold mb-4">Upload More Images</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex justify-center mb-6">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
          >
            <FaCloudUploadAlt className="text-lg" />
            Upload Images
            <FaChevronDown
              className={`transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
              {/* Local Upload Option */}
              <label className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b">
                <FaCloudUploadAlt className="text-gray-600" />
                <span>Upload from Computer</span>
                <input
                  type="file"
                  id="uploadFiles"
                  name="more_images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* URL Upload Option */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaLink className="text-gray-600" />
                  <span className="text-sm">Upload from URLs</span>
                </div>
                <textarea
                  placeholder="Enter image URLs (one per line)"
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleUrlUpload}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Upload URLs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-10">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="relative group w-40 border border-gray-300 rounded-md overflow-hidden"
          >
            <img
              src={url}
              alt={`Preview ${index}`}
              className="w-full h-40 object-cover"
            />
            <button
              type="button"
              onClick={(event) => handleRemoveImage(index, event)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreImagesUpload;
