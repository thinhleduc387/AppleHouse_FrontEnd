import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDefaultAddress } from "../../config/api";
import ChangeAddressForm from "./ChangeAddressForm";
import { useTranslation } from "react-i18next";

const CheckoutInfo = ({
  onSubmit,
  setOrderAddress,
  orderNote,
  setOrderNote,
}) => {
  const { t } = useTranslation("cart");
  const userId = useSelector((state) => state.account?.user?._id);
  const [address, setAddress] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Gửi dữ liệu form lên cho cha
  };

  useEffect(() => {
    if (!userId) return;
    const fetchAdress = async () => {
      const response = await getUserDefaultAddress({ id: userId });
      if (response.status === 200) {
        setAddress(response.metadata);
      }
    };
    fetchAdress();
  }, [userId]);

  useEffect(() => {
    setOrderAddress(address);
  }, [address]);

  const handleOnChangeAddress = async () => {
    setIsOpen(true);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-md">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        {t("shippingInfo")}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t("deliverTo")}
              </h3>
              <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                {address?.fullAddress}
              </p>
            </div>
            <button
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
              onClick={handleOnChangeAddress}
            >
              {t("change")}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("note")}
          </label>
          <textarea
            name="note"
            value={orderNote}
            style={{
              resize: "none",
            }}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder={t("notePlaceholder")}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition-all"
          />
        </div>
      </form>

      {isOpen && (
        <ChangeAddressForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setAddress={setAddress}
        />
      )}
    </div>
  );
};

export default CheckoutInfo;
