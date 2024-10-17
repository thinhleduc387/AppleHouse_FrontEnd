import { useState } from "react";
import FloatingInput from "../FloatingInput";
import { callSignUp } from "../../config/api";

const SignUpDialog = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form (refresh trang)

    try {
      // Gọi hàm đăng ký và chờ phản hồi
      const response = await callSignUp(email);

      // Kiểm tra xem phản hồi có thành công không
      if (response && response.status === 200) {
        console.log("Đăng ký thành công:", response.message); // Log thông báo thành công

        // Nếu đăng ký thành công, có thể đóng modal
        onClose();
      } else {
        // Nếu phản hồi không thành công (ví dụ: status khác 200)
        console.error("Đăng ký không thành công:", response);
        alert("Đăng ký không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      // Kiểm tra lỗi từ Axios
      if (error.response) {
        // Nếu có phản hồi từ server
        console.error("Có lỗi xảy ra khi đăng ký:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      } else {
        // Nếu không có phản hồi từ server (chẳng hạn lỗi mạng)
        console.error("Có lỗi xảy ra khi đăng ký:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  if (!isOpen) return null;
  return (
    <>
      {/* Main modal */}
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Sign up</h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <FloatingInput
                  label="Email address"
                  type="email"
                  id="email"
                  placeholder=" "
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Tiếp tục
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpDialog;
