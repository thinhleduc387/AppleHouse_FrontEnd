import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineCamera } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { callLogout } from "../../../config/api";
import { setLogoutAction } from "../../../redux/slice/accountSlice";
import { useNavigate } from "react-router-dom";

const AdminProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account?.user);

  const [formData, setFormData] = useState({
    name: user?.name || "Maria Smith",
    email: user?.email || "maria@email.com",
    phoneNumber: user?.phoneNumber || "(123) 456-7890",
    dob: user?.dob || "1990-01-01",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleLogOut = async () => {
    try {
      const response = await callLogout();
      if (response.status === 200 && response.metadata) {
        dispatch(setLogoutAction());
        navigate("/");
        toast.success("Logged out successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between bg-white px-6 py-4 rounded-lg shadow-md items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-700">Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image and Info */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="relative">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600">
              <AiOutlineCamera />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mt-4">
            {formData.name}
          </h2>
          <span className="text-sm bg-red-200 text-red-700 px-2 py-1 rounded-full mt-2">
            Admin
          </span>
          <button
            onClick={handleLogOut}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 shadow-md"
          >
            Log Out
          </button>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-6">
            My Profile Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-1"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-3 py-2 border rounded-md mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-1"
              />
            </div>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 shadow-md"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
