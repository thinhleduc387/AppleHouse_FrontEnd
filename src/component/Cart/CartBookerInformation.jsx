import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setGuestInformation } from "../../redux/slices/checkoutSlice";

const CartBookerInformation = () => {
  const user = useSelector((state) => state.account?.user);
  const isAuthenticated = useSelector(
    (state) => state.account?.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setGuestInformation(formData));
    }
  }, [formData]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-6">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <div className="p-2.5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Thông tin người đặt
            </h2>
            {!isAuthenticated ? (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">Bạn đã có tài khoản?</p>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Đăng nhập ngay
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Thông tin được lấy từ tài khoản của bạn
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            {isAuthenticated ? (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-800">{user?.name}</span>
              </div>
            ) : (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            {isAuthenticated && user?.phone ? (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-800">{user.phone}</span>
              </div>
            ) : (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            {isAuthenticated && user?.email ? (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-800">{user.email}</span>
              </div>
            ) : (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                required
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBookerInformation;
