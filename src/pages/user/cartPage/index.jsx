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
import CartBookerInformation from "../../../component/Cart/CartBookerInformation";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t } = useTranslation("cart");
  const userId = useSelector((state) => state.account?.user?._id);
  const isAuthenticated = useSelector(
    (state) => state.account?.isAuthenticated
  );

  const user = useSelector((state) => state.account?.user);

  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false);
  const localCartItems = useSelector((state) => state.cart?.localCartItems);
  const [cartItemSelected, setCartItemsSelected] = useState([]);

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
      } finally {
        setLoading(false);
      }
    };

    getShowCart();
  }, [userId, localCartItems, isCheckout]);

  const handleCheckout = () => {
    setIsCheckout(false);
  };

  const handleCheckAll = () => {
    setIsSelectAll((prev) => !prev);
  };

  return (
    <div className="py-4 bg-[#f3f4f6] dark:bg-gray-900 ">
      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-blue-400 border-solid"></div>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4 mx-[100px]">
          <div className="md:col-span-2">
            <div className=" p-4 flex justify-between gap-4 bg-white rounded-md font-bold overflow-y-auto">
              {!isCheckout ? (
                <>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={isSelectAll}
                      onChange={() => handleCheckAll()}
                      className="w-4 h-4 cursor-pointer"
                    />
                    {t("selectAll")} ({selectedProducts.length}/
                    {cartItems.length})
                  </div>
                  <button className="text-gray-600 hover:text-red-600">
                    <RiDeleteBin6Line className="w-6 h-6" />
                  </button>
                </>
              ) : (
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
            </div>

            <div className=" p-4 mt-3 flex flex-col gap-4 bg-white rounded-md overflow-x-auto">
              <div className="space-y-4 ">
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
                <CartBookerInformation />

                <div className="mt-4">
                  <CheckoutInfo onSubmit={handleCheckout} />
                </div>

                <div className="mt-4 ">
                  <PaymentMethod />
                </div>
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <CheckOut
              products_order={cartItemSelected}
              userId={userId}
              onCheckout={setIsCheckout}
              onContinueShopping={() => setIsCheckout(false)}
              isCheckout={isCheckout}
            />
          )}
        </div>
      ) : (
        <CartEmpty />
      )}

      <div className="py-5"></div>
    </div>
  );
};

export default CartPage;
