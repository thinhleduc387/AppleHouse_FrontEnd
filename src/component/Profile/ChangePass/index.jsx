import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../../config/api";
import { KeyRound, Eye, EyeOff, Shield, Lock, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h1>
              <p className="text-gray-600 mt-1">
                Cập nhật mật khẩu tài khoản của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Security Notice */}
          <div className="p-6 border-b border-gray-200 bg-yellow-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Để bảo mật tài khoản, vui lòng tạo mật khẩu mạnh và không chia
                sẻ mật khẩu cho người khác
              </p>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-6">
              {[
                {
                  id: "currentPassword",
                  label: "Mật khẩu hiện tại",
                  placeholder: "Nhập mật khẩu hiện tại",
                  icon: Lock,
                },
                {
                  id: "newPassword",
                  label: "Mật khẩu mới",
                  placeholder: "Nhập mật khẩu mới",
                  icon: KeyRound,
                },
                {
                  id: "reNewPassword",
                  label: "Xác nhận mật khẩu mới",
                  placeholder: "Xác nhận mật khẩu mới",
                  icon: KeyRound,
                },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <field.icon className="w-5 h-5" />
                    </div>
                    <input
                      type={showPasswords[field.id] ? "text" : "password"}
                      id={field.id}
                      value={passwordData[field.id]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder={field.placeholder}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
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

              <div className="pt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Cập nhật mật khẩu
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        reNewPassword: "",
                      })
                    }
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
