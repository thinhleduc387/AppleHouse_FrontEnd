import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import Loading from "../../../component/Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserTable from "../../../component/admin/user/UserTable";
import { getAllUsers, getListRole, lockUser } from "../../../config/api";
import CustomSelect from "../../../component/CustomSelect";

const ITEMS_PER_PAGE = 8;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ name: "", role: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, [filters]);

  const fetchRoles = async () => {
    try {
      const response = await getListRole();
      if (response && response.metadata) {
        setRoles(response.metadata);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers(filters);
      if (response && response.metadata) {
        setUsers(response.metadata);
        setFilteredUsers(response.metadata);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({ name: "", role: "" });
  };

  const handleToggleLockUser = async (userId, status) => {
    try {
      setIsLoading(true);
      const response = await lockUser(userId, status); // Gọi API để thay đổi trạng thái user
      console.log("🚀 ~ handleToggleLockUser ~ response:", response);
      if (response && response.status === 200) {
        toast.success(
          `User has been ${
            status === "active" ? "unlocked" : "locked"
          } successfully!`
        );
        await fetchUsers(); // Cập nhật lại danh sách người dùng
      } else {
        toast.error("Failed to update user status. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating user status. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const paginatedUsers = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between bg-white px-6 py-8 rounded-lg items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-700">User Management</h1>
        <Link
          to="/admin/users/add"
          className="ml-4 flex items-center bg-mainColor text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md"
        >
          <BiPlus className="mr-2 text-xl" /> Add User
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="Search by name"
          className="px-4 py-2 border rounded-lg w-1/3"
        />
        <CustomSelect
          options={[
            { value: "", label: "All Roles" },
            ...roles.map((role) => ({ value: role._id, label: role.rol_name })),
          ]}
          value={filters.role}
          onChange={(role) => setFilters({ ...filters, role })}
          placeholder="Select Role"
        />
        <button
          onClick={handleResetFilters}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 text-gray-700"
        >
          Reset
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <UserTable
              users={paginatedUsers()}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              handleToggleLockUser={handleToggleLockUser} // Truyền hàm xử lý toggle
            />
          </div>

          <ul className="flex space-x-5 justify-center mt-6">
            <li
              className={`flex items-center justify-center bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              <AiOutlineLeft className="text-gray-500" />
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center w-9 h-9 rounded-md cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </li>
              )
            )}
            <li
              className={`flex items-center justify-center bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            >
              <AiOutlineRight className="text-gray-500" />
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default UserPage;
