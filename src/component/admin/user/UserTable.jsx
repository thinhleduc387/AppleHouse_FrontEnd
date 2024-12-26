import React from "react";
import { AiOutlineEdit, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import NoAvatar from "../../NoAvatar";

const UserTable = ({
  users,
  selectedUsers,
  setSelectedUsers,
  handleToggleLockUser, // Hàm để xử lý khóa/mở khóa user
}) => {
  const areAllPageUsersSelected = users.every((user) =>
    selectedUsers.includes(user._id)
  );

  const handleSelectAllOnPage = () => {
    if (areAllPageUsersSelected) {
      const updatedSelectedUsers = selectedUsers.filter(
        (id) => !users.some((user) => user._id === id)
      );
      setSelectedUsers(updatedSelectedUsers);
    } else {
      const updatedSelectedUsers = [
        ...selectedUsers,
        ...users
          .filter((user) => !selectedUsers.includes(user._id))
          .map((user) => user._id),
      ];
      setSelectedUsers(updatedSelectedUsers);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      setSelectedUsers((prev) => [...prev, userId]);
    }
  };

  return (
    <div className="hidden md:block">
      <table className="w-full bg-white table-auto shadow-md rounded-lg">
        <thead className="rounded-t-lg">
          <tr className="bg-white">
            <th className="p-5 text-left rounded-tl-lg">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={areAllPageUsersSelected}
                onChange={handleSelectAllOnPage}
              />
            </th>
            <th className="p-5 text-left">Họ tên</th>
            <th className="p-5 text-left">Email</th>
            <th className="p-5 text-left">Ngày đăng ký</th>
            <th className="p-5 text-left">Vai trò</th>
            <th className="p-5 text-center rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={`hover:bg-gray-50 ${
                selectedUsers.includes(user._id) ? "bg-blue-50" : ""
              }`}
            >
              <td className="p-5 border-b">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleSelectUser(user._id)}
                />
              </td>
              <td className="p-5 border-b flex items-center gap-3">
                {user.usr_avatar ? (
                  <img
                    src={user.usr_avatar}
                    alt={`${user.usr_name}'s avatar`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <NoAvatar />
                )}
                <span className="text-mainColor font-semibold">
                  {user.usr_name}
                </span>
              </td>
              <td className="p-5 border-b text-gray-700">{user.usr_email}</td>
              <td className="p-5 border-b text-gray-700">
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td className="p-5 border-b text-gray-700">
                {user.usr_role.rol_name}
              </td>

              <td className="p-5 border-b text-center">
                <div className="flex justify-center items-center text-3xl gap-x-2">
                  {user.usr_status === "active" ? (
                    <AiOutlineUnlock
                      className="text-green-500 cursor-pointer hover:text-green-700"
                      onClick={() => handleToggleLockUser(user._id, 'block')}
                    />
                  ) : (
                    <AiOutlineLock
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleToggleLockUser(user._id, 'active')}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
