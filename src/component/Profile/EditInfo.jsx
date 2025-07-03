import React, { useState, useRef } from "react";
import { Camera } from "lucide-react"; // Xóa X, Upload, Pencil
import { getImageLink, updateProfile } from "../../config/api";
import { toast } from "react-toastify";
import { fetchAccount } from "../../redux/slices/accountSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import FloatingInput from "../FloatingInput";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const EditInfo = ({
  onSave,
  userName,
  userEmail,
  userAvatar,
  userPhone,
  userGender,
  userDOB,
  onAvatarChange,
}) => {
  const { t } = useTranslation("profile");
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(userAvatar || "");
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [formData, setFormData] = useState({
    usr_name: userName || "",
    usr_phone: userPhone || "",
    usr_sex: userGender || "male", // Chuẩn hóa giá trị mặc định
    usr_date_of_birth: userDOB ? formatDate(userDOB) : "",
    usr_email: userEmail || "",
    usr_img: userAvatar || "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);

      try {
        const response = await getImageLink(imageFormData);
        if (response.status === 200) {
          const imageUrl = response.metadata.image_url;
          setAvatarPreview(URL.createObjectURL(file));
          setFormData((prev) => ({ ...prev, usr_img: imageUrl }));
          onAvatarChange?.(file);
        } else {
          toast.error(t("errorUploadImage"));
        }
      } catch (error) {
        toast.error(t("errorUploadImage"));
        console.error("Error uploading image:", error);
      }
    }
  };

  const validateForm = () => {
    if (!formData.usr_name.trim()) {
      toast.error(t("errorNameRequired"));
      return false;
    }
    if (formData.usr_phone && !/^\d{10,11}$/.test(formData.usr_phone)) {
      toast.error(t("errorInvalidPhone"));
      return false;
    }
    if (formData.usr_date_of_birth) {
      const dob = new Date(formData.usr_date_of_birth);
      if (dob > new Date()) {
        toast.error(t("errorInvalidDOB"));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await updateProfile({ ...formData });
      if (response.status === 200) {
        toast.success(t("updateSuccess"));
        dispatch(fetchAccount());
        onSave();
      } else {
        toast.error(response.message || t("updateFailed"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      {/* Avatar Editor */}
      <div className="mb-8 flex justify-center">
        <div
          className="relative group"
          onMouseEnter={() => setIsHoveringAvatar(true)}
          onMouseLeave={() => setIsHoveringAvatar(false)}
        >
          <div className="relative h-32 w-32">
            <img
              src={avatarPreview || "/default-avatar.png"}
              alt="Profile"
              className="h-full w-full rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
            />
            <button
              onClick={handleAvatarClick}
              className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white transition-opacity
                ${isHoveringAvatar ? "opacity-100" : "opacity-0"}`}
            >
              <Camera className="h-6 w-6" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FloatingInput
          label={t("fullName")}
          type="text"
          id="usr_name"
          name="usr_name"
          value={formData.usr_name}
          onChange={handleChange}
          placeholder={t("enterFullName")}
          required
        />

        <FloatingInput
          label={t("email")}
          type="email"
          id="usr_email"
          name="usr_email"
          value={formData.usr_email}
          disabled
          className="cursor-not-allowed bg-gray-50 dark:bg-gray-700"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("gender")}
          </label>
          <div className="mt-2 flex gap-6">
            {["male", "female"].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="usr_sex"
                  value={gender}
                  checked={formData.usr_sex === gender}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-400"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {t(gender)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <FloatingInput
          label={t("dateOfBirth")}
          type="date"
          id="usr_date_of_birth"
          name="usr_date_of_birth"
          value={
            formData.usr_date_of_birth
              ? formatDate(formData.usr_date_of_birth)
              : ""
          }
          onChange={handleChange}
        />

        <FloatingInput
          label={t("phoneNumber")}
          type="tel"
          id="usr_phone"
          name="usr_phone"
          value={formData.usr_phone}
          onChange={handleChange}
          placeholder={t("enterPhoneNumber")}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg bg-blue-600 dark:bg-blue-500 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-300
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {t("updating")}
            </span>
          ) : (
            t("updateInformation")
          )}
        </button>
      </form>
    </div>
  );
};

export default React.memo(EditInfo);
