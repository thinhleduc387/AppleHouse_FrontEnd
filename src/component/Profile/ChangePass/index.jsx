import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../../config/api";
import { KeyRound, Eye, EyeOff } from "lucide-react";

const ChangePass = () => {
  const userEmail = useSelector((state) => state.account?.user?.email);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    reNewPassword: false,
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu mới và xác nhận mật khẩu mới trùng nhau
    if (passwordData.newPassword !== passwordData.reNewPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await changePassword(
        userEmail,
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.reNewPassword
      );

      if (response?.status === 200) {
        toast.success("Mật khẩu đã được cập nhật thành công!");
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình xử lý.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="md:p-4 min-h-1">
      <h1 className="text-xl font-semibold mb-4">Đổi mật khẩu</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="p-3 bg-red-50 rounded-full">
              <KeyRound className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Cập nhật mật khẩu
              </h2>
              <p className="text-gray-500 text-sm">
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            {[
              {
                id: "currentPassword",
                label: "Mật khẩu hiện tại",
                placeholder: "Nhập mật khẩu hiện tại",
              },
              {
                id: "newPassword",
                label: "Mật khẩu mới",
                placeholder: "Nhập mật khẩu mới",
              },
              {
                id: "reNewPassword",
                label: "Xác nhận mật khẩu mới",
                placeholder: "Xác nhận mật khẩu mới",
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={showPasswords[field.id] ? "text" : "password"}
                    id={field.id}
                    value={passwordData[field.id]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords[field.id] ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
