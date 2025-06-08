import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  openExpand,
  setCurentSuggestedProducts,
} from "../../../redux/slices/chatBotSlice";

const ChatMessages = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const MAX_VISIBLE_PRODUCTS = 2;
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role !== "user" && (
              <img
                src="/chatbot.png"
                alt="AI"
                className="w-8 h-8 flex-shrink-0"
              />
            )}
            <div
              className={`rounded-lg p-3 max-w-[70%] shadow-sm ${
                message.role === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white"
              }`}
            >
              <div className="break-words">{message.content}</div>
              <div>
                {message?.suggested_products?.length > 0 && (
                  <div className="mt-2 w-full ">
                    <div
                      className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-gray hover:bg-gray-100 cursor-pointer rounded-md p-[10px]"
                      onClick={() => {
                        dispatch(openExpand());
                        dispatch(
                          setCurentSuggestedProducts(
                            message?.suggested_products
                          )
                        );
                      }}
                    >
                      {message.suggested_products
                        .slice(0, MAX_VISIBLE_PRODUCTS)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex-shrink-0 w-16 h-16  rounded-lg flex items-center justify-center border border-gray-200"
                          >
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      {message.suggested_products.length >
                        MAX_VISIBLE_PRODUCTS && (
                        <div className="flex-shrink-0 w-16 h-16  rounded-lg flex items-center justify-center border border-gray-200">
                          <span className="text-sm font-medium">
                            +
                            {message.suggested_products.length -
                              MAX_VISIBLE_PRODUCTS}
                          </span>
                        </div>
                      )}
                      <div className="flex-shrink-0 text-black rounded-lg flex items-center justify-center ">
                        <span className="text-sm font-medium">
                          Xem sản phẩm
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2 justify-start">
            <img
              src="/chatbot.png"
              alt="AI"
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="rounded-lg p-3 max-w-[70%] shadow-sm bg-white">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  AI đang xử lý...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
