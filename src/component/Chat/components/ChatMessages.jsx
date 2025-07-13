import { useEffect, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import {
  openExpand,
  setCurentSuggestedProducts,
} from "../../../redux/slices/chatBotSlice";
import { useTranslation } from "react-i18next";

const ChatMessages = ({ messages, isLoading }) => {
  const { t } = useTranslation("chatBot");
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
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
              className={`rounded-lg p-3 max-w-[70%] shadow-sm dark:shadow-gray-700 ${
                message.role === "user"
                  ? "bg-blue-500 dark:bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              } transition-colors duration-300`}
            >
              <div className="break-words">{message.content}</div>
              <div>
                {message?.suggested_products?.length > 0 && (
                  <div className="mt-2 w-full">
                    <div
                      className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer rounded-md p-[10px] transition-colors duration-300"
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
                            className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600"
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
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            +
                            {message.suggested_products.length -
                              MAX_VISIBLE_PRODUCTS}
                          </span>
                        </div>
                      )}
                      <div className="flex-shrink-0 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {t("viewProducts")}
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
            <div className="rounded-lg p-3 max-w-[70%] shadow-sm dark:shadow-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                  {t("aiProcessing")}
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

export default memo(ChatMessages);
