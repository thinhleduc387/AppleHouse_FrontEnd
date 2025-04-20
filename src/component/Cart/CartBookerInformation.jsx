import { useSelector } from "react-redux";

const CartBookerInformation = () => {
  const user = useSelector((state) => state.account?.user);
  return (
    <div className="mt-6">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <div className="p-2 bg-red-50 rounded-full">
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
            <p className="text-sm text-gray-500">
              Thông tin được lấy từ tài khoản của bạn
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-800">{user?.name}</span>
            </div>
          </div>

          {user?.phone && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-800">{user?.phone}</span>
              </div>
            </div>
          )}

          {user?.email && (
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-800">{user?.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartBookerInformation;
