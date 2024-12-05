import React from "react";
import CartItem from "../../../component/Product/Cart/CartItem";

const CartPage = () => {
  return (
    <div className="py-4 bg-slate-500 ">
      <div className="grid md:grid-cols-3 gap-4 relative">
        <div className="md:col-span-2 p-4 bg-white rounded-md  overflow-y-auto">
          <div className="space-y-4">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </div>
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
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">$52.00</span>
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
      </div>
    </div>
  );
};

export default CartPage;
