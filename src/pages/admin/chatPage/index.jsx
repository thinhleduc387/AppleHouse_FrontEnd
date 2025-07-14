import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiArrowLeft, FiX, FiImage, FiSend } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import {
  getAllChatRoom,
  getAllMessage,
  getImageLink,
} from "../../../config/api";
import Loading from "../../../component/Loading";
import { useSelector } from "react-redux";
import socket, {
  joinChatRoom,
  onNewMessage,
  sendMessage,
} from "../../../socket";

const ChatPage = () => {
  const { headerHeight, mainPadding } = useOutletContext();
  const padding =
    window.innerWidth >= 1536
      ? mainPadding["2xl"]
      : window.innerWidth >= 768
      ? mainPadding.md
      : mainPadding.sm;
  const currentUserId = useSelector((state) => state.account?.user?._id);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: "user1",
      content: "He về chơi thú vị bên đi",
      timestamp: "2025-06-17T22:01:00+07:00",
      messageType: "text",
    },
    {
      id: 2,
      senderId: "user1",
      content: "Tối nay có đi chơi không?",
      timestamp: "2025-06-17T22:02:00+07:00",
      messageType: "text",
    },
    {
      id: 3,
      senderId: "user1",
      content: "Vui hơn năm ngoái rồi",
      timestamp: "2025-06-17T22:03:00+07:00",
      messageType: "text",
    },
    {
      id: 4,
      senderId: "user2",
      content: "siêu vui!",
      timestamp: "2025-06-17T22:04:00+07:00",
      messageType: "text",
    },
    {
      id: 5,
      senderId: "user1",
      content: "Cảm ơn bạn đã tặng quà cho mình!",
      timestamp: "2025-06-17T22:05:00+07:00",
      messageType: "text",
    },
    {
      id: 6,
      senderId: "user1",
      content: "Cảm ơn bạn lần nữa nhé!",
      timestamp: "2025-06-17T22:06:00+07:00",
      messageType: "text",
    },
    {
      id: 7,
      senderId: "user2",
      content: "ok",
      timestamp: "2025-06-17T22:07:00+07:00",
      messageType: "text",
    },
  ]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const uploadAreaRef = useRef(null);
  const headerRef = useRef(null);
  const inputAreaRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [imageUrls, setImageUrls] = useState("");
  const [urlError, setUrlError] = useState("");
  const [invalidUrls, setInvalidUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, SetSelectedChatRoom] = useState({});
  // Đo chiều cao Header và Input Area
  const [chatHeaderHeight, setChatHeaderHeight] = useState(72);
  const [inputAreaHeight, setInputAreaHeight] = useState(56);

  useEffect(() => {
    if (headerRef.current) {
      setChatHeaderHeight(headerRef.current.offsetHeight);
    }
    if (inputAreaRef.current) {
      setInputAreaHeight(inputAreaRef.current.offsetHeight);
    }
  }, [showUploadArea, selectedImages]);

  // Điều chỉnh chiều cao textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
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

  // Tự động cuộn đến tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedImages]);

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

    setSelectedImages((prev) => [...prev, ...urls]);
    setImageUrls("");
    setShowUploadArea(false);
    setUrlError("");
    setInvalidUrls([]);
  };

  // Xử lý upload ảnh với getImageLink
  const handleImageUpload = async (e, urlList = []) => {
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

      // Cập nhật selectedImages
      setSelectedImages(newImages);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setUrlError("Không thể tải ảnh lên, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffMs = now - messageTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60)
      return diffMinutes === 0 ? "Vừa xong" : `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
  };

  const handleSelectChat = (chat) => {
    SetSelectedChatRoom(chat);
    joinChatRoom(chat?.customer?._id);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && selectedImages.length === 0) return;

    const message = {
      roomId: selectedChatRoom?.customer?._id,
      senderId: currentUserId,
      content: messageInput.trim(),
      messageType: selectedImages.length > 0 ? "image" : "text",
      imageUrl: selectedImages.length > 0 ? selectedImages : null,
    };

    console.log("Tin nhắn được gửi:", {
      content: message.content,
      imageUrl: message.imageUrl,
      messageType: message.messageType,
      roomId: message.roomId,
      senderId: message.senderId,
    });

    sendMessage(message);

    setMessageInput("");
    setSelectedImages([]);
  };

  const handleFetchAllChatRoom = async () => {
    const response = await getAllChatRoom();
    setChatRooms(response.metadata);
  };

  useEffect(() => {
    handleFetchAllChatRoom();
  }, []);

  const getAllMessagesInChatRoom = async () => {
    const response = await getAllMessage({
      roomId: selectedChatRoom?.customer?._id,
    });

    setMessages(response.metadata);
  };

  useEffect(() => {
    getAllMessagesInChatRoom();
  }, [selectedChatRoom]);

  useEffect(() => {
    onNewMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChatRoom]);
  return (
    <div
      className="flex h-full bg-gray-100 overflow-hidden"
      style={{
        height: `calc(100vh - ${headerHeight}px - ${padding * 2}px)`, // Trừ headerHeight và padding trên/dưới
      }}
    >
      {/* Chat List */}
      <div className="w-[360px] bg-white shadow-lg flex flex-col">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3">
            <FiSearch className="text-gray-500 text-xl" />
            <input
              className="flex-1 bg-transparent text-base text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="Tìm kiếm"
              type="text"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
          {chatRooms.map((chat) => (
            <div
              key={chat._id}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedChatRoom._id === chat._id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelectChat(chat)}
            >
              <img
                alt={`Avatar of ${chat.customer.usr_name}`}
                className="w-12 h-12 rounded-full"
                src={chat.customer.usr_avatar}
                width="48"
                height="48"
              />
              <div className="flex-1 flex flex-col max-w-[calc(100%-104px)]">
                <div className="text-gray-800 text-base font-medium truncate">
                  {chat.customer.usr_name}
                </div>
                <div className="text-gray-500 text-sm truncate">
                  {chat?.lastMessage?.sender === currentUserId ? "Bạn: " : ""}
                  {chat?.lastMessage?.content
                    ? chat?.lastMessage?.content
                    : "Đã gửi một ảnh"}
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                {formatTime(chat?.lastMessage?.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Conversation */}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div
            ref={headerRef}
            className="flex items-center gap-4 px-4 py-4 border-b border-gray-200 shrink-0"
          >
            <button aria-label="Back" className="text-gray-500 md:hidden">
              <FiArrowLeft size={24} />
            </button>
            <img
              alt="User profile picture"
              className="w-12 h-12 rounded-full"
              src={selectedChatRoom?.customer?.usr_avatar}
              width="48"
              height="48"
            />
            <div className="flex flex-col">
              <span className="text-gray-800 text-base font-medium">
                {selectedChatRoom?.customer?.usr_name}
              </span>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{
              maxHeight: `calc(100% - ${chatHeaderHeight}px - ${inputAreaHeight}px)`,
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.messageType === "text" ? (
                  <div
                    className={`max-w-[70%] break-words ${
                      message.sender === currentUserId
                        ? "bg-blue-500 rounded-2xl rounded-br-none ml-4 text-white"
                        : "bg-gray-200 rounded-2xl mr-4"
                    } p-3`}
                    style={
                      message.sender !== currentUserId
                        ? { width: "fit-content", minWidth: "56px" }
                        : {}
                    }
                  >
                    <div className="text-base">{message.content}</div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {message.imageUrl.length > 0 &&
                      message.imageUrl.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Uploaded image ${index + 1}`}
                          className={`h-auto rounded-xl cursor-pointer ${
                            message.sender === currentUserId ? "ml-4" : "mr-4"
                          }`}
                          style={{ maxHeight: "160px" }}
                          onClick={() => setSelectedImage(url)}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/160?text=Error";
                          }}
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Section (Upload Area + Preview Area + Input) */}
          <div className="sticky bottom-0 bg-white shrink-0">
            {/* Upload Area */}
            {showUploadArea && (
              <div
                className="px-4 py-3 bg-gray-50 border-t border-gray-200"
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
                      <FiImage className="text-gray-600" />
                      <span>Upload from Computer</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <FiImage className="text-gray-600" />
                        <span className="text-sm">Upload from URLs</span>
                      </div>
                      {urlError && (
                        <div className="text-red-500 text-xs mb-2">
                          <p>{urlError}</p>
                          {invalidUrls.length > 0 && (
                            <div className="pl-4 text-xs">
                              {invalidUrls.map((url, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1"
                                >
                                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                                  <span>{url}</span>
                                </div>
                              ))}
                            </div>
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

            {selectedImages.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="max-w-full bg-blue-100 rounded-2xl rounded-br-none p-3">
                  <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
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

            {/* Input */}
            <div
              ref={inputAreaRef}
              className="flex items-center gap-4 px-4 py-4 border-t border-gray-200"
            >
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              <button
                aria-label="Image upload"
                className="text-gray-500"
                onClick={() => setShowUploadArea(!showUploadArea)}
              >
                <FiImage size={24} />
              </button>
              <textarea
                ref={textareaRef}
                className="flex-1 min-w-0 bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
                placeholder="Aa"
                rows="1"
                style={{ minHeight: "48px", maxHeight: "144px" }}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              ></textarea>
              <button
                aria-label="Send"
                className="text-gray-500"
                onClick={handleSendMessage}
              >
                <FiSend size={24} />
              </button>
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-full max-h-full">
                <img
                  src={selectedImage}
                  alt="Full-size image"
                  className="max-w-full max-h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/240?text=Error";
                  }}
                />
                <button
                  aria-label="Close image"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  onClick={() => setSelectedImage(null)}
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
