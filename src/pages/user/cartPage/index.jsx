import React, { useEffect, useState } from "react";
import { getCartItemList, getShowCartForLocal } from "../../../config/api";
import { useSelector } from "react-redux";
import CartEmpty from "../../../component/Cart/CartEmpty";
import CartItem from "../../../component/Cart/CartItem";
import CheckOut from "../../../component/Cart/CheckOut";
import CheckoutInfo from "../../../component/Cart/CheckoutInfo"; // Import CheckoutInfo
import { IoIosArrowBack } from "react-icons/io";
import PaymentMethod from "../../../component/Cart/PaymentMethod";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartPage = () => {
  const userId = useSelector((state) => state.account?.user?._id);
  const [cartItems, setCartItems] = useState([]);
  console.log("🚀 ~ CartPage ~ cartItems:", cartItems);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false); // Trạng thái thanh toán
  const [error, setError] = useState(null);
  const localCartItems = useSelector((state) => state.cart?.localCartItems);

  useEffect(() => {
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
  }, [userId, localCartItems]);

  const handleCheckout = (formData) => {
    console.log("Thông tin thanh toán:", formData);

    setIsCheckout(false); // Quay lại trạng thái giỏ hàng sau khi thanh toán xong
  };
  const handleCheckAll = () => {
    setIsSelectAll((prev) => !prev);
  };
  return (
    <div className="py-4">
      {loading ? (
        <div class="flex items-center justify-center h-[50vh]">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4 relative">
          <div className="md:col-span-2">
            <div className=" p-4 flex justify-between gap-4 bg-white rounded-md font-bold overflow-y-auto">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={isSelectAll} // Đảm bảo trạng thái đồng bộ
                  onChange={() => handleCheckAll()} // Sử dụng callback để thay đổi trạng thái
                  className="w-4 h-4 cursor-pointer"
                />
                Chọn tất cả ({selectedProducts.length}/{cartItems.length})
              </div>
              <button className="text-gray-600 hover:text-red-600">
                <RiDeleteBin6Line className="w-6 h-6" />
              </button>
            </div>

            <div className=" p-4 mt-3 flex flex-col gap-4 bg-white rounded-md overflow-y-auto">
              {isCheckout && (
                <a
                  onClick={() => setIsCheckout(false)}
                  className="text-mainColor flex flex-row items-center cursor-pointer"
                >
                  <IoIosArrowBack />
                  Quay lại giỏ hàng
                </a>
              )}
              <div className="space-y-4 ">
                {cartItems.map((cartItem) => (
                  <CartItem
                    isSelectAll={isSelectAll}
                    key={cartItem.skuId}
                    cartItem={cartItem}
                    setSelectedProducts={setSelectedProducts}
                    setCartItems={setCartItems}
                    isCheckout={isCheckout}
                  />
                ))}
              </div>
            </div>
            {/* Hiển thị CheckoutInfo ngay dưới CheckOut nếu đang trong trạng thái thanh toán */}
            {isCheckout && (
              <>
                <div className="mt-4 ">
                  <CheckoutInfo
                    onSubmit={handleCheckout} // Xác nhận thanh toán
                  />
                </div>
                <div className="mt-4 ">
                  <PaymentMethod
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                  />
                </div>
              </>
            )}
          </div>

          {/* Hiển thị CheckOut */}
          {cartItems.length > 0 && (
            <CheckOut
              products_order={selectedProducts}
              userId={userId}
              onCheckout={() => setIsCheckout(true)} // Start the checkout process
              onContinueShopping={() => setIsCheckout(false)} // Go back to the cart
              isCheckout={isCheckout} // Pass the checkout state to toggle button text
            />
          )}
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default CartPage;
