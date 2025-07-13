import React, { useRef, useState, useEffect } from "react";
import { FiImage, FiX, FiSend } from "react-icons/fi";
import { FaCloudUploadAlt, FaLink } from "react-icons/fa";
import { getImageLink } from "../../../config/api";
import Loading from "../../../component/Loading";

const ChatSend = ({
  messageInput,
  setMessageInput,
  selectedImages,
  handleImageUpload,
  handleDeleteImage,
  handleSendMessage,
  fileInputRef,
}) => {
  const textareaRef = useRef(null);
  const uploadAreaRef = useRef(null);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [imageUrls, setImageUrls] = useState("");
  const [urlError, setUrlError] = useState("");
  const [invalidUrls, setInvalidUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Điều chỉnh chiều cao textarea tin nhắn
  useEffect(() => {
    const textarea = textareaRef.current;
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    };
    textarea.addEventListener("input", adjustHeight);
    adjustHeight();
    return () => textarea.removeEventListener("input", adjustHeight);
  }, [messageInput]);

  // Đóng Upload Area khi nhấn ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        uploadAreaRef.current &&
        !uploadAreaRef.current.contains(event.target)
      ) {
        setShowUploadArea(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Kiểm tra URL hợp lệ
  const isValidImageUrl = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    try {
      const urlObj = new URL(url);
      return imageExtensions.some((ext) =>
        urlObj.pathname.toLowerCase().endsWith(ext)
      );
    } catch {
      return false;
    }
  };

  // Hàm xử lý upload ảnh (tích hợp getImageLink)
  const updatedHandleImageUpload = async (e, urlList = []) => {
    setIsLoading(true);
    let newImages = [...selectedImages];

    try {
      // Xử lý file từ máy tính
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        const responses = await Promise.all(
          files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await getImageLink(formData);
            return response.metadata.image_url;
          })
        );
        newImages = [...newImages, ...responses];
      }

      // Xử lý URL trực tiếp
      if (urlList.length > 0) {
        newImages = [...newImages, ...urlList];
      }

      handleImageUpload(newImages);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input file
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setUrlError("Không thể tải ảnh lên, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý thêm URL ảnh
  const handleUrlUpload = () => {
    if (!imageUrls.trim()) {
      setUrlError("Vui lòng nhập ít nhất một URL ảnh.");
      setInvalidUrls([]);
      return;
    }

    const urls = imageUrls.split("\n").filter((url) => url.trim());
    const invalidUrls = urls.filter((url) => !isValidImageUrl(url));

    if (invalidUrls.length > 0) {
      setUrlError("Một số URL không phải ảnh hợp lệ:");
      setInvalidUrls(invalidUrls);
      return;
    }

    updatedHandleImageUpload({ target: { files: [] } }, urls);
    setImageUrls("");
    setShowUploadArea(false);
    setUrlError("");
    setInvalidUrls([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col shrink-0">
      {/* Upload Area */}
      {showUploadArea && (
        <div
          className="px-4 py-3 bg-gray-50 border-t border-gray-300 shrink-0"
          ref={uploadAreaRef}
        >
          <div className="max-w-full bg-blue-100 rounded-2xl rounded-br-none p-3">
            <div className="flex flex-col gap-3">
              <label
                className="flex items-center gap-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-600 p-2 rounded-md"
                onClick={() => {
                  fileInputRef.current.click();
                  setShowUploadArea(false);
                }}
              >
                <FaCloudUploadAlt />
                <span>Upload from Computer</span>
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FaLink className="text-gray-600" />
                  <span className="text-sm">Upload from URLs</span>
                </div>
                {urlError && (
                  <div className="text-red-500 text-xs mb-2">
                    <p>{urlError}</p>
                    {invalidUrls.length > 0 && (
                      <ul className="list-disc pl-4 text-xs">
                        {invalidUrls.map((url, index) => (
                          <li key={index}>{url}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <textarea
                  placeholder="Enter image URLs (one per line)"
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  className="w-full h-16 px-2 py-1 text-xs bg-gray-100 rounded-[16px] text-black placeholder-gray-500 focus:outline-none resize-none"
                />
                <div className="flex justify-end gap-1">
                  <button
                    className="px-2 py-1 bg-gray-300 text-black rounded-md text-xs hover:bg-gray-400"
                    onClick={() => setShowUploadArea(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
                    onClick={handleUrlUpload}
                  >
                    Add URLs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Area */}
      {selectedImages.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-300 shrink-0">
          <div className="max-w-full bg-blue-100 rounded-2xl rounded-br-none p-3">
            <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview image ${index + 1}`}
                    className="h-20 w-auto rounded-lg object-cover"
                    style={{ minWidth: "80px" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80?text=Error";
                    }}
                  />
                  <button
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 text-sm hover:bg-red-600"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div
        className="flex items-center gap-4 px-4 py-3 border-t border-gray-300 text-gray-600 text-base flex-wrap shrink-0"
        style={{
          minHeight: "56px",
          maxHeight: "176px",
          overflowY: "auto",
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => updatedHandleImageUpload(e)}
        />
        <div className="relative">
          <button
            aria-label="Image upload options"
            className="focus:outline-none text-lg"
            onClick={() => setShowUploadArea(!showUploadArea)}
          >
            <FiImage />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          className="flex-1 min-w-[200px] bg-gray-100 rounded-[16px] px-4 py-2 text-black text-sm placeholder-gray-500 focus:outline-none resize-none"
          placeholder="Aa"
          rows="1"
          style={{
            minHeight: "40px",
            maxHeight: "120px",
          }}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></textarea>
        <button
          aria-label="Send"
          className="focus:outline-none text-gray-600 text-2xl"
          onClick={handleSendMessage}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatSend;
