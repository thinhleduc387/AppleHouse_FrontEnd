import { useState } from "react";

const OrderGuest = () => {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrderDetails(null);
    setLoading(true);

    try {
      // Giả lập gọi API
      const response = await fetch(`/api/order?code=${orderCode}`);
      const data = await response.json();

      if (response.ok) {
        setOrderDetails(data);
      } else {
        setError(data.message || "Không tìm thấy đơn hàng");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Tra cứu đơn hàng
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nhập mã đơn hàng để kiểm tra trạng thái
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="text"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              placeholder="Nhập mã đơn hàng"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              disabled={loading || !orderCode}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || !orderCode
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Đang tra cứu..." : "Tra cứu"}
            </button>
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {orderDetails && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900">
                Thông tin đơn hàng
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Mã đơn hàng:</span>{" "}
                  {orderDetails.code}
                </p>
                <p>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  {orderDetails.status}
                </p>
                <p>
                  <span className="font-medium">Ngày đặt:</span>{" "}
                  {orderDetails.orderDate}
                </p>
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  {orderDetails.total} VND
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderGuest;
