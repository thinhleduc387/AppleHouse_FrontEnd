import React, { useEffect, useState } from "react";
import CartItem from "../../../component/Product/Cart/CartItem";
import { getCartItemList } from "../../../config/api";
import { useSelector } from "react-redux";
import CheckOut from "../../../component/Product/Cart/CheckOut";

const CartPage = () => {
  const userId = useSelector((state) => state.account?.user?._id);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!userId) return;

    const getShowCart = async () => {
      try {
        setLoading(true);
        const response = await getCartItemList(userId);
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
  }, [userId]);

  return (
    <div className="py-4">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 relative">
          <div className="md:col-span-2 p-4 bg-white rounded-md overflow-y-auto">
            <div className="space-y-4">
              {cartItems.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem.skuId}
                    cartItem={cartItem}
                    setSelectedProducts={setSelectedProducts}
                  />
                );
              })}
            </div>
          </div>
          <CheckOut products_order={selectedProducts} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
