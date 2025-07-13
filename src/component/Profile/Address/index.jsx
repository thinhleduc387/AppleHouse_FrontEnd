import React, { useEffect, useState, memo } from "react";
import { Home, Plus, Building2, X } from "lucide-react";
import AddressForm from "./AddressForm";
import { deleteUserAddress, getListUserAddress } from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setHiddenChatBot } from "../../../redux/slices/chatBotSlice";
import { useTranslation } from "react-i18next";

const Address = () => {
  const { t } = useTranslation("address");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.account?.user?._id);
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchListAddress = async () => {
    try {
      setIsLoading(true);
      const response = await getListUserAddress({ id: userId });
      if (response.status === 200) {
        setAddresses(response.metadata);
      } else {
        toast.error(response.message || t("loadingError"));
      }
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.includes("Unauthorized")
      ) {
        toast.error(t("sessionExpired"));
      } else {
        toast.error(error.response?.data?.message || t("loadingError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOpenSideBar = (value) => {
    setIsOpen(value);
    dispatch(setHiddenChatBot(value));
  };

  useEffect(() => {
    if (!userId) return;
    fetchListAddress();
  }, [userId]);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    toggleOpenSideBar(true);
  };

  const handleDeleteAddress = async (address) => {
    try {
      const res = await deleteUserAddress(address._id);
      if (res.status === 200) {
        toast.success(t("deleteSuccess"));
        fetchListAddress();
      } else {
        toast.error(res.message || t("deleteError"));
      }
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.includes("Unauthorized")
      ) {
        toast.error(t("sessionExpired"));
      } else {
        toast.error(error.response?.data?.message || t("deleteError"));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto min-h-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 transition-colors duration-300">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {t("addressTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {t("manageAddressesDescription")}
            </p>
          </div>
          <button
            onClick={() => toggleOpenSideBar(true)}
            className="bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>{t("addNewAddressButton")}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-4"
              >
                <div className="animate-pulse flex items-start gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg w-10 h-10"></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 w-full">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : addresses && addresses.length > 0 ? (
          addresses?.map((address, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-4 flex items-start gap-4 transition-colors duration-300"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <Home className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {address.fullName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {address.phone}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {address.fullAddress}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-300"
                      onClick={() => handleEditAddress(address)}
                    >
                      {t("editButton")}
                    </button>
                    <button
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300"
                      onClick={() => handleDeleteAddress(address)}
                    >
                      {t("deleteButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 transition-colors duration-300">
            <div className="mb-6">
              <Building2 className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              {t("noAddressesTitle")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t("noAddressesDescription")}
            </p>
          </div>
        )}
      </div>

      <AddressForm
        isOpen={isOpen}
        setIsOpen={toggleOpenSideBar}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        fetchListAddress={fetchListAddress}
      />
    </div>
  );
};

export default memo(Address);
