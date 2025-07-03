import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react"; // Xóa Camera, X, Upload vì không sử dụng
import EditInfo from "../EditInfo";
import { useTranslation } from "react-i18next";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Chỉ lấy phần `YYYY-MM-DD`
};

const Info = () => {
  const { t } = useTranslation("profile");
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.account?.user);
  const [avatar, setAvatar] = useState(user?.avatar || "");

  if (!user) {
    return (
      <div className="text-center text-lg text-gray-600 dark:text-gray-300">
        {t("noUserData")}
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (formData) => {
    setIsEditing(false);
  };

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("personalInformation")}
        </h3>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
          >
            <Pencil className="h-4 w-4" />
            {t("editProfile")}
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow dark:shadow-gray-700 transition-colors duration-300">
        <div className="p-6">
          {isEditing ? (
            <EditInfo
              onSave={handleSaveClick}
              userName={user.name}
              userEmail={user.email}
              userAvatar={user.avatar}
              userPhone={user.phone}
              userGender={user.sex}
              userDOB={user.dataOfBirth}
              onAvatarChange={handleAvatarChange}
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <img
                  src={avatar || user.avatar || "/default-avatar.png"} // Thêm fallback
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                />
              </div>
              <div className="w-full max-w-md space-y-4">
                {[
                  { label: t("fullName"), value: user.name || "" },
                  { label: t("email"), value: user.email || "" }, // Sửa lỗi cú pháp
                  {
                    label: t("dateOfBirth"),
                    value: user.dataOfBirth ? formatDate(user.dataOfBirth) : "",
                  },
                  { label: t("phoneNumber"), value: user.phone || "" },
                  { label: t("gender"), value: user.sex || "" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-200 dark:border-gray-600 py-3"
                  >
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.label}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Info);
