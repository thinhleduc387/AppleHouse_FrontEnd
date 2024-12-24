import React, { useState } from "react";

const EditInfo = ({ onSave, userName, userEmail }) => {
  const [formData, setFormData] = useState({
    fullName: userName || "", // Đảm bảo giá trị ban đầu từ props
    phoneNumber: "",
    gender: "",
    birthDate: "",
    email: userEmail || "", // Đảm bảo giá trị ban đầu từ props
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi onSave để gửi dữ liệu về component cha
    onSave(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-4"></div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Họ và tên"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-200"
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Nam"
              checked={formData.gender === "Nam"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="male" className="mr-4">
              Nam
            </label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="Nữ"
              checked={formData.gender === "Nữ"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="female">Nữ</label>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            Ngày sinh
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tel"
            className="block text-sm font-medium text-gray-700"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600"
          >
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
