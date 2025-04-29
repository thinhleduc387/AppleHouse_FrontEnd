import { FaMoneyBillWaveAlt, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrderMethodPayment } from "../../redux/slices/checkoutSlice";
import { useTranslation } from "react-i18next";
const PaymentMethod = () => {
  const { t } = useTranslation("cart");
  const dispatch = useDispatch();
  const orderMethodPayment = useSelector(
    (state) => state.checkout.orderMethodPayment
  );

  const handlePaymentSelect = (method) => {
    dispatch(setOrderMethodPayment(method));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-2 bg-red-50 rounded-full">
          <FaCreditCard className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Phương thức thanh toán
          </h2>
          <p className="text-sm text-gray-500">
            Chọn phương thức thanh toán phù hợp với bạn
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Stripe Payment */}
        <label className="relative block">
          <input
            type="radio"
            className="hidden"
            checked={orderMethodPayment === "STRIPE"}
            onChange={() => handlePaymentSelect("STRIPE")}
          />
          <div
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              orderMethodPayment === "STRIPE"
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <FaCreditCard className={`w-5 h-5 text-blue-600`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Thanh toán bằng Stripe
                </p>
                <p className="text-sm text-gray-500">
                  Thanh toán an toàn qua cổng Stripe
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                orderMethodPayment === "STRIPE"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {orderMethodPayment === "STRIPE" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </div>
        </label>

        {/* COD Payment */}
        <label className="relative block">
          <input
            type="radio"
            className="hidden"
            checked={orderMethodPayment === "COD"}
            onChange={() => handlePaymentSelect("COD")}
          />
          <div
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              orderMethodPayment === "COD"
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <FaMoneyBillWaveAlt className={`w-5 h-5 text-green-600`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Thanh toán khi nhận hàng
                </p>
                <p className="text-sm text-gray-500">
                  Thanh toán bằng tiền mặt khi nhận hàng
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                orderMethodPayment === "COD"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {orderMethodPayment === "COD" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
