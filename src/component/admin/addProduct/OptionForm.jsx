import React, { useState } from "react";
import { ImBin } from "react-icons/im";
import { FaCloudUploadAlt, FaLink, FaChevronDown } from "react-icons/fa";

const OptionForm = ({
  variation,
  variationIndex,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onImageUpload,
  onRemoveImage,
}) => {
  const [loadingImages, setLoadingImages] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [uploadType, setUploadType] = useState({});
  const [showDropdown, setShowDropdown] = useState({});

  const handleImageUpload = async (variationIndex, optionIndex, file) => {
    // Cập nhật trạng thái đang tải ảnh
    setLoadingImages((prev) => ({
      ...prev,
      [`${variationIndex}-${optionIndex}`]: true,
    }));

    // Gọi hàm tải ảnh từ props và chờ xử lý
    await onImageUpload(variationIndex, optionIndex, file);

    // Sau khi tải xong, tắt trạng thái đang tải
    setLoadingImages((prev) => ({
      ...prev,
      [`${variationIndex}-${optionIndex}`]: false,
    }));
  };

  const handleImageUrlSubmit = async (optionIndex) => {
    if (!imageUrl.trim()) return;

    setLoadingImages((prev) => ({
      ...prev,
      [`${variationIndex}-${optionIndex}`]: true,
    }));

    try {
      // Pass the URL to parent component
      await onImageUpload(variationIndex, optionIndex, imageUrl, true);
      setImageUrl(""); // Clear input after successful upload
    } catch (error) {
      console.error("Error uploading image from URL:", error);
    } finally {
      setLoadingImages((prev) => ({
        ...prev,
        [`${variationIndex}-${optionIndex}`]: false,
      }));
    }
  };

  const toggleUploadType = (optionIndex, type) => {
    setUploadType((prev) => ({
      ...prev,
      [optionIndex]: prev[optionIndex] === type ? null : type,
    }));
    setImageUrl(""); // Clear URL input when switching
  };

  const toggleDropdown = (optionIndex) => {
    setShowDropdown((prev) => ({
      ...prev,
      [optionIndex]: !prev[optionIndex],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row mb-4">
      <label className="font-medium w-1/3">Tùy chọn:</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 w-full">
        {variation.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-4">
              <input
                type="text"
                value={option}
                onChange={(e) =>
                  onOptionChange(variationIndex, optionIndex, e.target.value)
                }
                className="w-full mt-1 p-2 border rounded"
                placeholder={`Tùy chọn ${optionIndex + 1}`}
              />
              <button
                onClick={() => onRemoveOption(variationIndex, optionIndex)}
                className="text-red-500"
              >
                <ImBin />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Smaller Image Preview */}
              {variation.images && variation.images[optionIndex] && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={variation.images[optionIndex]}
                    alt={`Option ${optionIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(variationIndex, optionIndex)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow-sm"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Upload Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(optionIndex)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <FaCloudUploadAlt className="text-sm" />
                  Ảnh
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                      showDropdown[optionIndex] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showDropdown[optionIndex] && (
                  <div className="absolute z-10 mt-1 w-52 bg-white rounded-md shadow-lg border border-gray-100">
                    <label className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <FaCloudUploadAlt className="text-gray-500" />
                      <span className="text-gray-700">Upload từ máy</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageUpload(
                            variationIndex,
                            optionIndex,
                            e.target.files[0]
                          );
                          toggleDropdown(optionIndex);
                        }}
                        className="hidden"
                      />
                    </label>

                    <div className="px-3 py-2 border-t border-gray-100">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 w-full">
                          <FaLink className="text-gray-500 text-sm flex-shrink-0" />
                          <input
                            type="text"
                            placeholder="Nhập URL hình ảnh"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full min-w-0 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <button
                          onClick={() => {
                            handleImageUrlSubmit(optionIndex);
                            toggleDropdown(optionIndex);
                          }}
                          className="w-full px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors text-gray-700"
                        >
                          Tải lên
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Loading indicator */}
              {loadingImages[`${variationIndex}-${optionIndex}`] && (
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-blue-500">Đang tải...</p>
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => onAddOption(variationIndex)}
          className="mt-2 px-4 py-1 text-sm text-mainColor border border-dashed rounded hover:bg-[#f1f6ff]"
        >
          Thêm tùy chọn
        </button>
      </div>
    </div>
  );
};

export default OptionForm;
