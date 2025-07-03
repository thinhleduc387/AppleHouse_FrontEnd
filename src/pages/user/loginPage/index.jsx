import { memo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Thêm import cho useNavigate
import {
  addToCartFromLocal,
  callLogin,
  callLoginGG,
} from "../../../config/api";
import SignUpDialog from "../../../component/Auth/SignUp";
import FloatingInput from "../../../component/FloatingInput";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginInfo } from "../../../redux/slices/accountSlice";
import { toast } from "react-toastify";
import { clearLocalCart, fetchCart } from "../../../redux/slices/cartSlice";
import { useTranslation } from "react-i18next"; // Thêm useTranslation

const LoginPage = () => {
  const { t } = useTranslation("auth"); // Sử dụng namespace auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const localCartItems = useSelector((state) => state.cart?.localCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const userId = useSelector((state) => state.account?.user?._id);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await callLogin(email, password);

      if (response.status === 200 && response.metadata) {
        toast.success(t("loginSuccess"));
        const user = response.metadata.user;
        localStorage.setItem(
          "access_token",
          response.metadata.tokens.accessToken
        );
        localStorage.setItem("user_id", user._id);
        dispatch(setUserLoginInfo(user));

        if (localCartItems.length > 0) {
          const response = await addToCartFromLocal({
            userId: user._id,
            carts: localCartItems,
          });
          dispatch(fetchCart(user._id));
          if (response.status === 200) {
            dispatch(clearLocalCart());
          }
        }

        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(t("loginError"));
      console.error("Login error:", error);
    }
  };

  const handleLoginGG = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col py-8 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-16 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("signInTitle")}
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FloatingInput
              label={t("emailLabel")}
              type="email"
              id="email"
              placeholder=" "
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FloatingInput
              label={t("passwordLabel")}
              type="password"
              id="password"
              placeholder=" "
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t("signInButton")}
              </button>
              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300 max-w">
                {t("noAccountText")}{" "}
                <a
                  href="#"
                  onClick={() => setSignUpDialogOpen(true)}
                  className="font-medium text-blue-400 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("signUpLink")}
                </a>
              </p>
            </div>
          </form>
          <SignUpDialog
            isOpen={isSignUpDialogOpen}
            onClose={() => setSignUpDialogOpen(false)}
          />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <button
                  onClick={handleLoginGG}
                  className="w-full flex items-center justify-center py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    alt="Google"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
