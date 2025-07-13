import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../../config/api";
import { KeyRound, Eye, EyeOff, Shield, Lock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const ChangePass = () => {
  const { t } = useTranslation("changePass");
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

    if (passwordData.newPassword !== passwordData.reNewPassword) {
      toast.error(t("passwordMismatchError"));
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
        toast.success(t("updateSuccess"));
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          reNewPassword: "",
        });
      } else {
        toast.error(response?.data?.message || t("updateError"));
      }
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.includes("Unauthorized")
      ) {
        toast.error(t("sessionExpired"));
      } else {
        toast.error(error.response?.data?.message || t("processingError"));
      }
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

  const fields = [
    {
      id: "currentPassword",
      label: t("currentPasswordLabel"),
      placeholder: t("currentPasswordPlaceholder"),
      icon: Lock,
    },
    {
      id: "newPassword",
      label: t("newPasswordLabel"),
      placeholder: t("newPasswordPlaceholder"),
      icon: KeyRound,
    },
    {
      id: "reNewPassword",
      label: t("reNewPasswordLabel"),
      placeholder: t("reNewPasswordPlaceholder"),
      icon: KeyRound,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-200 dark:border-gray-600 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {t("changePassword")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("updatePasswordDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-200 dark:border-gray-600">
          {/* Security Notice */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-600 bg-yellow-50 dark:bg-yellow-900/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {t("securityNotice")}
              </p>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <field.icon className="w-5 h-5" />
                    </div>
                    <input
                      type={showPasswords[field.id] ? "text" : "password"}
                      id={field.id}
                      value={passwordData[field.id]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      placeholder={field.placeholder}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-300"
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

              <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 font-medium"
                  >
                    {t("updatePasswordButton")}
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
                    className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    {t("cancelButton")}
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

export default memo(ChangePass);
