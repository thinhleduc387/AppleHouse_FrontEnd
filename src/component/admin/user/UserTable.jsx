import React, { useState, useEffect } from "react";
import {
  AiOutlineEdit,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineBell,
} from "react-icons/ai";
import RoleUpdateModal from "./RoleUpdateModal";
import NoAvatar from "../../NoAvatar";
import { changeRole, sendNotification } from "../../../config/api";
import { useTranslation } from "react-i18next";
import NotificationModal from "./NotificationModal";

const UserTable = ({
  users,
  selectedUsers,
  setSelectedUsers,
  handleToggleLockUser,
  refreshUsers,
}) => {
  const { t } = useTranslation("userManagement");
  const [modalUser, setModalUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState({
    receivedId: "",
    message: "",
    title: "",
  });
  console.log("🚀 ~ notificationData:", notificationData);

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

  const handleUpdateRole = async (userId, roleId) => {
    try {
      const response = await changeRole(userId, roleId);
      console.log("🚀 ~ handleUpdateRole ~ response:", response);
      setModalUser(null);
      await refreshUsers();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleSendNotification = async (userId) => {
    try {
      const dataToSend = {
        ...notificationData,
        receivedId: userId,
      };
      const response = await sendNotification(dataToSend);
      console.log("🚀 ~ handleSendNotification ~ response:", response);
      setShowNotificationModal(false);
    } catch (error) {
      console.error("Failed to send notification:", error);
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
            <th className="p-5 text-left">{t("Full Name")}</th>
            <th className="p-5 text-left">{t("Email")}</th>
            <th className="p-5 text-left">{t("Registration Date")}</th>
            <th className="p-5 text-left">{t("Role")}</th>
            <th className="p-5 text-center rounded-tr-lg">{t("Actions")}</th>
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
                <div className="flex justify-center items-center text-3xl gap-x-4">
                  {user.usr_status === "active" ? (
                    <AiOutlineUnlock
                      className="text-green-500 cursor-pointer hover:text-green-700"
                      onClick={() => handleToggleLockUser(user._id, "block")}
                    />
                  ) : (
                    <AiOutlineLock
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleToggleLockUser(user._id, "active")}
                    />
                  )}
                  <AiOutlineEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => setModalUser(user)}
                  />
                  <AiOutlineBell
                    className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                    onClick={() => {
                      setShowNotificationModal(true);
                      setNotificationData({
                        receivedId: user._id, // Pre-fill receivedId with the user's ID
                        message: "",
                        title: "",
                      });
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalUser && (
        <RoleUpdateModal
          user={modalUser}
          onClose={() => setModalUser(null)}
          onSave={(userId, roleId) => handleUpdateRole(userId, roleId)}
        />
      )}

      {showNotificationModal && (
        <NotificationModal
          userId={
            notificationData.receivedId ||
            users.find((u) => u._id === selectedUsers[0])?._id
          }
          notificationData={notificationData}
          setNotificationData={setNotificationData}
          onClose={() => setShowNotificationModal(false)}
          onSend={handleSendNotification}
        />
      )}
    </div>
  );
};

export default UserTable;
