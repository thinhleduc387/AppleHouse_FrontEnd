import { Link } from "react-router-dom";

const ProfileSection = ({ userName, userAvatar, userEmail }) => {
  return (
    <div className="flex items-center px-6 space-x-4 bg-white dark:bg-gray-800">
      <img
        src={userAvatar}
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover dark:brightness-90"
      />

      <div className="ml-4 flex flex-col justify-center">
        <div className="max-w-xs">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 overflow-wrap break-word">
            {userName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 overflow-wrap break-word">
            {userEmail}
          </p>
        </div>

        <Link
          to="/profile"
          className="text-sm text-blue-500 dark:text-blue-400 mt-2 hover:underline dark:hover:text-blue-300"
        >
          Xem hồ sơ
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
