import React from "react";
import { FaUpload } from "react-icons/fa";

const ThumbnailUpload = ({ productData, setProductData }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    if (file) {
      const fileURL = URL.createObjectURL(file); // Tạo đường dẫn tạm cho hình ảnh

      // Cập nhật thông tin ảnh vào productData
      setProductData({
        ...productData,
        thumb: fileURL,
      });
      const formData = new FormData();
      formData.append("file", file); // 'file' là tên trường mà backend mong đợi

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/product/thumb",
          {
            method: "POST",
            body: formData,
          }
        );
        console.log("🚀 ~ handleFileChange ~ response:", response);
      } catch (error) {
        console.error("Lỗi khi tải hình ảnh lên:", error);
      }
    }
  };

  return (
    <div className="w-full h-auto">
      <h2 className="text-xl font-bold mb-4">Ảnh sản phẩm</h2>
      <label
        htmlFor="uploadFile1"
        className={`bg-white text-gray-500 font-semibold text-base rounded h-auto flex flex-col items-center 
        justify-center cursor-pointer ${
          productData.thumb ? "" : "border-2 border-mainColor border-dashed"
        } 
        mx-auto font-[sans-serif]`}
      >
        {productData.thumb ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={productData.thumb}
              alt="Thumbnail Preview"
              className="max-w-full max-h-full object-contain transform scale-200"
            />
          </div>
        ) : (
          <div className="flex flex-col text-mainColor justify-center items-center p-20">
            <FaUpload className="w-11 mb-2 text-mainColor" />
            Upload file
          </div>
        )}
        <input
          type="file"
          id="uploadFile1"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange} // Khi chọn file, gọi handleFileChange
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ThumbnailUpload;
