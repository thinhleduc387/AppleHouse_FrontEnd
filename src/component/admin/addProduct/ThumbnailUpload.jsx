import React, { useState } from "react";
import { FaUpload, FaTrash, FaCloudUploadAlt, FaLink } from "react-icons/fa";
import { getImageLink } from "../../../config/api";
import Loading from "../../../component/Loading";

const ThumbnailUpload = ({ productData, setProductData }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Tạo URL tạm thời cho file
      setPreviewUrl(fileURL); // Gán URL tạm thời vào previewUrl

      const formData = new FormData();
      formData.append("file", file);

      setIsLoading(true); // Bắt đầu trạng thái tải lên
      try {
        const response = await getImageLink(formData);
        console.log("🚀 ~ handleFileChange ~ response:", response);

        // Cập nhật thông tin ảnh vào productData
        setProductData({
          ...productData, // Duy trì các thuộc tính hiện có
          thumb: response.metadata.image_url, // Cập nhật thumb bằng URL từ API
        });
      } catch (error) {
        console.error("Lỗi khi tải hình ảnh lên:", error);
      } finally {
        setIsLoading(false); // Kết thúc trạng thái tải lên
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null); // Xóa URL xem trước
    setProductData({
      ...productData,
      thumb: null, // Xóa thumb trong productData
    });
  };

  const handleUrlUpload = async () => {
    if (!imageUrl.trim()) return;
    setIsLoading(true);
    try {
      setPreviewUrl(imageUrl);
      setProductData({
        ...productData,
        thumb: imageUrl,
      });
      setImageUrl("");
      setShowOptions(false);
    } catch (error) {
      console.error("Error uploading image from URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-auto">
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold mb-4">Ảnh thumbnail</h2>
            {(previewUrl || productData.thumb) && (
              <button
                onClick={handleRemoveImage}
                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 w-8 h-8"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="relative">
            <div
              onClick={() => setShowOptions(true)}
              className={`bg-white text-gray-500 font-semibold text-base rounded h-auto flex flex-col items-center 
              justify-center cursor-pointer ${
                previewUrl || productData.thumb
                  ? ""
                  : "border-2 border-mainColor border-dashed"
              } 
              mx-auto font-[sans-serif] relative`}
            >
              {previewUrl || productData.thumb ? (
                <div className="relative w-full h-full flex items-center justify-center group">
                  <img
                    src={previewUrl || productData.thumb}
                    alt="Thumbnail Preview"
                    className="max-w-full max-h-full object-contain transform scale-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaUpload className="text-white text-3xl" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-mainColor justify-center items-center p-20">
                  <FaUpload className="w-11 mb-2 text-mainColor" />
                  Upload file
                </div>
              )}
            </div>

            {/* Upload Options Modal */}
            {showOptions && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                  className="absolute inset-0 bg-black opacity-50"
                  onClick={() => setShowOptions(false)}
                ></div>
                <div className="bg-white rounded-lg shadow-xl p-6 z-10 w-80">
                  <h3 className="text-lg font-semibold mb-4">
                    Chọn phương thức tải lên
                  </h3>

                  <div className="space-y-4">
                    {/* Local Upload Option */}
                    <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <FaCloudUploadAlt className="text-xl text-blue-500" />
                      <span>Upload từ máy</span>
                      <input
                        type="file"
                        id="uploadFile1"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileChange(e);
                          setShowOptions(false);
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* URL Upload Option */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <FaLink className="text-xl text-blue-500" />
                        <input
                          type="text"
                          placeholder="Nhập URL hình ảnh"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="flex-1 outline-none text-sm"
                        />
                      </div>
                      <button
                        onClick={handleUrlUpload}
                        disabled={!imageUrl.trim()}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Tải lên
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowOptions(false)}
                    className="mt-4 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ThumbnailUpload;
