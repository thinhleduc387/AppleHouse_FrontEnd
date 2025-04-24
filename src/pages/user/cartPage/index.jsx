import React, { useEffect, useState } from "react";
import { getCartItemList, getShowCartForLocal } from "../../../config/api";
import { useSelector } from "react-redux";
import CartEmpty from "../../../component/Cart/CartEmpty";
import CartItem from "../../../component/Cart/CartItem";
import CheckOut from "../../../component/Cart/CheckOut";
import CheckoutInfo from "../../../component/Cart/CheckoutInfo";
import { IoIosArrowBack } from "react-icons/io";
import PaymentMethod from "../../../component/Cart/PaymentMethod";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartItemCheckout from "../../../component/Cart/CartItemCheckout";
import LoginRequiredModal from "./LoginRequireModal";
import RecommendSectionForCart from "../../../component/RecommendSection/RecomendSectionInCart";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t } = useTranslation("cart");
  const userId = useSelector((state) => state.account?.user?._id);
  const user = useSelector((state) => state.account?.user);

  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false);
  const [error, setError] = useState(null);
  const localCartItems = useSelector((state) => state.cart?.localCartItems);
  const [cartItemSelected, setCartItemsSelected] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [orderAddress, setOrderAddress] = useState("");
  const [orderMethodPayment, setOrderMethodPayment] = useState("");
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    if (isCheckout !== false) {
      return;
    }
    const getShowCart = async () => {
      try {
        setLoading(true);
        const response = userId
          ? await getCartItemList(userId)
          : await getShowCartForLocal({ carts: localCartItems });

        if (response.status === 200) {
          setCartItems(response.metadata);
        } else {
          throw new Error("Failed to fetch cart items");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getShowCart();
  }, [userId, localCartItems, isCheckout]);

  const handleCheckout = (formData) => {
    setIsCheckout(false);
  };

  const handleCheckAll = () => {
    setIsSelectAll((prev) => !prev);
  };

  const handleCheckoutAuth = () => {
    if (userId) {
      setIsCheckout(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="py-4 bg-[#f3f4f6] dark:bg-gray-900">
      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-blue-400 border-solid"></div>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="p-4 flex justify-between gap-4 bg-white dark:bg-gray-800 rounded-md font-bold overflow-y-auto">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={isSelectAll}
                  onChange={() => handleCheckAll()}
                  className="w-4 h-4 cursor-pointer text-blue-500 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <span className="text-gray-800 dark:text-gray-100">
                  {t("selectAll")} ({selectedProducts.length}/{cartItems.length}
                  )
                </span>
              </div>
              <button className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                <RiDeleteBin6Line className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 mt-3 flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-md overflow-x-auto">
              {isCheckout && (
                <a
                  onClick={() => {
                    setIsCheckout(false);
                  }}
                  className="text-blue-500 dark:text-blue-400 flex flex-row items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-300"
                >
                  <IoIosArrowBack className="text-blue-500 dark:text-blue-400" />
                  <span>{t("backToCart")}</span>
                </a>
              )}
              <div className="space-y-4">
                {!isCheckout &&
                  cartItems.map((cartItem) => (
                    <CartItem
                      isSelectAll={isSelectAll}
                      key={cartItem.skuId}
                      cartItem={cartItem}
                      setSelectedProducts={setSelectedProducts}
                      setCartItems={setCartItems}
                      isCheckout={isCheckout}
                      setCartItemsSelected={setCartItemsSelected}
                    />
                  ))}
                {isCheckout &&
                  cartItemSelected.map((cartItem) => (
                    <CartItemCheckout cartItem={cartItem} />
                  ))}
              </div>
            </div>
            {isCheckout && (
              <>
                {userId && (
                  <div className="mt-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                        {t("customerInfo")}
                      </h2>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                            {t("fullName")}
                          </label>
                          <input
                            type="text"
                            name="phone"
                            disabled
                            value={user?.name}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                            required
                          />
                        </div>
                        {user?.email && (
                          <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                              {t("email")}
                            </label>
                            <input
                              type="text"
                              name="phone"
                              disabled
                              value={user?.email}
                              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                              required
                            />
                          </div>
                        )}
                        {user?.phone && (
                          <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                              {t("phoneNumber")}:
                            </label>
                            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                              {user?.phone}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <CheckoutInfo
                    onSubmit={handleCheckout}
                    setOrderAddress={setOrderAddress}
                    orderNote={orderNote}
                    setOrderNote={setOrderNote}
                  />
                </div>

                <div className="mt-4">
                  <PaymentMethod
                    orderMethodPayment={orderMethodPayment}
                    setOrderMethodPayment={setOrderMethodPayment}
                  />
                </div>
              </>
            )}
          </div>
          <LoginRequiredModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
          {cartItems.length > 0 && (
            <CheckOut
              products_order={cartItemSelected}
              userId={userId}
              onCheckout={() => handleCheckoutAuth()}
              onContinueShopping={() => setIsCheckout(false)}
              isCheckout={isCheckout}
              orderMethodPayment={orderMethodPayment}
              orderAddress={orderAddress}
              orderNote={orderNote}
            />
          )}
        </div>
      ) : (
        <CartEmpty />
      )}
      {!isCheckout && userId && cartItems.length > 0 && (
        <div className="py-14 bg-[#f3f4f6] dark:bg-gray-900">
          <RecommendSectionForCart />
        </div>
      )}
      <div className="py-5 bg-[#f3f4f6] dark:bg-gray-900"></div>
    </div>
  );
};

export default CartPage;
