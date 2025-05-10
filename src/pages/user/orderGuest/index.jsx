import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const OrderGuest = () => {
  const navigate = useNavigate();
  const [orderCode, setOrderCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý khi người dùng nhập thủ công và nhấn Tra cứu
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderCode) {
      setError("Vui lòng nhập mã vận đơn");
      return;
    }
    setError("");
    setLoading(true);
    navigate(`/order-guest/tracking/${orderCode}`);
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-center text-gray-800">
              Tra cứu đơn hàng
            </h1>
            <p className="mt-3 text-center text-sm text-gray-500">
              Nhập mã vận đơn để kiểm tra trạng thái đơn hàng của bạn
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="Nhập mã vận đơn"
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Đang tra cứu...
                  </span>
                ) : (
                  "Tra cứu"
                )}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderGuest;
