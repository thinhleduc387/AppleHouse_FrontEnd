import { useEffect, useState } from "react";
import { formatVND } from "../../utils";
import { getCheckout } from "../../config/api";

const initCheckOutValue = {
  accLoyalPoint: 0,
  feeShip: 0,
  productDiscount: 0,
  totalCheckOut: 0,
  totalPrice: 0,
  voucherDiscount: 0,
};
const CheckOut = ({ products_order, userId }) => {
  const [checkoutValue, setCheckOutValue] = useState(initCheckOutValue);
  useEffect(() => {
    const handleCheckOut = async () => {
      const response = await getCheckout({ products_order, userId });
      if (response.status === 200) {
        setCheckOutValue(response.metadata.checkOut_order);
      }
    };

    handleCheckOut();
  }, [products_order]);

  return (
    <div className="bg-white rounded-md p-4 md:self-start sticky top-0 right-0">
      <div className="flex border border-blue-600 overflow-hidden rounded-md">
        <input
          type="email"
          placeholder="Promo code"
          className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
        />
        <button
          type="button"
          className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
        >
          Apply
        </button>
      </div>

      <ul className="text-gray-800 mt-8 space-y-4">
        <li className="flex flex-wrap gap-4 text-base">
          Discount{" "}
          <span className="ml-auto font-bold">
            {formatVND(checkoutValue.productDiscount)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-base">
          Shipping{" "}
          <span className="ml-auto font-bold">
            {formatVND(checkoutValue.feeShip)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-base">
          Loyal Point{" "}
          <span className="ml-auto font-bold">
            {formatVND(checkoutValue.accLoyalPoint)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-base font-bold">
          Total{" "}
          <span className="ml-auto">
            {" "}
            {formatVND(checkoutValue.totalCheckOut)}
          </span>
        </li>
      </ul>

      <div className="mt-8 space-y-2">
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Checkout
        </button>
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
export default CheckOut;
