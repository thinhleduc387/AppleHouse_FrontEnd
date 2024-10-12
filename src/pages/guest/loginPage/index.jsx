import { memo, useState } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import "./style.scss"; // Import style nếu có

const FloatingInput = ({ label, type, id, placeholder, required, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value} // Sử dụng value từ props
        onChange={onChange} // Gọi hàm onChange từ props
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder={placeholder}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Trạng thái cho email
  const [password, setPassword] = useState(""); // Trạng thái cho password

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        password,
      });

      if (response.data.success) {
        alert(`Chào bạn ${email}`);
        // Có thể chuyển hướng hoặc thực hiện hành động khác sau khi đăng nhập thành công
      } else {
        alert("Đăng nhập không thành công");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-16 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FloatingInput
              label="Email address"
              type="email"
              id="email"
              placeholder=" "
              required={true}
              value={email} // Truyền value vào FloatingInput
              onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị email
            />

            <FloatingInput
              label="Password"
              type="password"
              id="password"
              placeholder=" "
              required={true}
              value={password} // Truyền value vào FloatingInput
              onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị password
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-400 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
              <p className="mt-4 text-center text-sm text-gray-600 max-w">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-500"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    alt="Google"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
