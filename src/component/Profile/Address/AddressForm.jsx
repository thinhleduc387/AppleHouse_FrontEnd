import React, { useState, useEffect, memo } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { addNewUserAddress, updateUserAddress } from "../../../config/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddressForm = ({
  isOpen,
  setIsOpen,
  fetchListAddress,
  selectedAddress,
  setSelectedAddress,
}) => {
  const { t } = useTranslation("address");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const userId = useSelector((state) => state.account?.user?._id);

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setCity("");
    setDistrict("");
    setWard("");
    setSpecificAddress("");
    setIsDefault(false);
    setSelectedAddress(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  useEffect(() => {
    if (!selectedAddress) return;

    setFullName(selectedAddress.fullName);
    setPhone(selectedAddress.phone);
    setCity(selectedAddress.city);
    setDistrict(selectedAddress.district);
    setWard(selectedAddress.ward);
    setSpecificAddress(selectedAddress.specificAddress);
    setIsDefault(selectedAddress.isDefault);
  }, [selectedAddress]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setCities(response.data);
      } catch (error) {
        toast.error(t("errorFetchingCities"));
      }
    };
    fetchCities();
  }, [t]);

  useEffect(() => {
    if (!selectedAddress) return;

    const fetchLocationData = async () => {
      try {
        setFullName(selectedAddress.fullName);
        setPhone(selectedAddress.phone);
        setCity(selectedAddress.city);
        setSpecificAddress(selectedAddress.specificAddress);
        setIsDefault(selectedAddress.isDefault);

        const cityCode = cities.find(
          (c) => c.name === selectedAddress.city
        )?.code;
        if (cityCode) {
          const districtResponse = await axios.get(
            `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
          );
          setDistricts(districtResponse.data.districts);
          setDistrict(selectedAddress.district);

          const districtCode = districtResponse.data.districts.find(
            (d) => d.name === selectedAddress.district
          )?.code;

          if (districtCode) {
            const wardResponse = await axios.get(
              `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
            );
            setWards(wardResponse.data.wards);
            setWard(selectedAddress.ward);
          }
        }
      } catch (error) {
        toast.error(t("errorFetchingAddressData"));
      }
    };

    if (cities.length > 0) {
      fetchLocationData();
    }
  }, [selectedAddress, cities, t]);

  useEffect(() => {
    if (city && !selectedAddress) {
      const fetchDistricts = async () => {
        const cityCode = cities.find((c) => c.name === city)?.code;
        if (cityCode) {
          try {
            const response = await axios.get(
              `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
            );
            setDistricts(response.data.districts);
            setWards([]);
            setWard("");
          } catch (error) {
            toast.error(t("errorFetchingDistricts"));
          }
        }
      };
      fetchDistricts();
    }
  }, [city, selectedAddress, cities, t]);

  useEffect(() => {
    if (district && !selectedAddress) {
      const fetchWards = async () => {
        const districtCode = districts.find((d) => d.name === district)?.code;
        if (districtCode) {
          try {
            const response = await axios.get(
              `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
            );
            setWards(response.data.wards);
          } catch (error) {
            toast.error(t("errorFetchingWards"));
          }
        }
      };
      fetchWards();
    }
  }, [district, selectedAddress, districts, t]);

  const handleSubmit = async () => {
    try {
      const formData = {
        fullName,
        phone,
        city,
        district,
        ward,
        specificAddress,
        isDefault,
      };

      let response;
      if (selectedAddress) {
        response = await updateUserAddress({
          addressId: selectedAddress._id,
          updatedAddress: formData,
        });
        toast.success(t("updateSuccess"));
      } else {
        response = await addNewUserAddress({
          id: userId,
          address: formData,
        });
        toast.success(t("addSuccess"));
      }

      if (response.status === 200) {
        fetchListAddress();
        handleClose();
      } else {
        toast.error(response.message || t("submitError"));
      }
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.includes("Unauthorized")
      ) {
        toast.error(t("sessionExpired"));
      } else {
        toast.error(error.response?.data?.message || t("submitError"));
      }
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleClose}
      ></div>

      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {selectedAddress
                ? t("updateAddressTitle")
                : t("addNewAddressTitle")}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 mb-4">
                  {t("recipientInfo")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">
                      {t("fullNameLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("fullNamePlaceholder")}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">
                      {t("phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-500 dark:text-gray-400 mb-4">
                  {t("deliveryAddress")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">
                      {t("cityLabel")}
                    </label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">{t("cityPlaceholder")}</option>
                      {cities.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">
                      {t("districtLabel")}
                    </label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!city}
                    >
                      <option value="">{t("districtPlaceholder")}</option>
                      {districts.map((d) => (
                        <option key={d.code} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">
                      {t("wardLabel")}
                    </label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      disabled={!district}
                    >
                      <option value="">{t("wardPlaceholder")}</option>
                      {wards.map((w) => (
                        <option key={w.code} value={w.name}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">
                      {t("specificAddressLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("specificAddressPlaceholder")}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      value={specificAddress}
                      onChange={(e) => setSpecificAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-gray-900 dark:text-gray-100">
                    <input
                      type="checkbox"
                      className="mr-2 border-gray-200 dark:border-gray-600 rounded"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                    {t("setDefaultLabel")}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <button
              className="w-full bg-red-500 dark:bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 dark:hover:bg-red-600 transition-colors duration-300"
              onClick={handleSubmit}
            >
              {selectedAddress ? t("updateButton") : t("addButton")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AddressForm);
