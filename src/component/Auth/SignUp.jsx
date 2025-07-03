import { useState } from "react";
import { Loader2 } from "lucide-react";
import { callSignUp } from "../../config/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SignUpDialog = ({ isOpen, onClose }) => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await callSignUp(email);

      if (response.status === 200 && response.metadata) {
        toast.success(t("signUpSuccess"));
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(t("signUpError"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("signUpTitle")}
            </h3>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center disabled:opacity-50"
            >
              <svg
                className="w-3 h-3 dark:text-gray-300"
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
              <span className="sr-only">{t("closeModal")}</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 dark:text-white bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400 peer"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {t("emailLabel")}
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 dark:text-white" />
                    {t("processing")}
                  </div>
                ) : (
                  t("continueButton")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpDialog;
