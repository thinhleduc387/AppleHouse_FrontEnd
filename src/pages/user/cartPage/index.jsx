import React from "react";
import CartItem from "../../../component/Cart/CartItem";
import "../../../style/scrollBar.css";
import PaymentSection from "../../../component/Cart/PaymentSection";

const CartPage = () => {
  return (
    <div className="py-4 ">
      <div className="grid md:grid-cols-3 gap-4 relative ">
        <div className="md:col-span-2 p-4 bg-white rounded-md h-screen overflow-y-auto custom-scroll overflow-x-hidden">
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
          <PaymentSection />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
