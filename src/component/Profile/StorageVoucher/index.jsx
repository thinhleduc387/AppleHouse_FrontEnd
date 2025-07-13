import React, { useEffect, useState, memo } from "react";
import { getListVoucher } from "../../../config/api";
import SearchBar from "./SearchBar";
import VoucherTabs from "./VoucherTabs";
import VoucherCard from "./VoucherCard";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import VoucherModal from "./VoucherModal";

const StorageVoucher = () => {
  const { t } = useTranslation("voucherUser");
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  const handleViewDetails = (voucher) => {
    setSelectedVoucher(voucher);
    setShowModal(true);
  };

  const getListVouchers = async () => {
    try {
      const response = await getListVoucher({
        page: 1,
        limit: 10,
        isPublic: true,
      });

      if (response?.status === 200) {
        setVouchers(response.metadata.discounts);
      } else {
        toast.error(response.message || t("errorFetchingVouchers"));
      }
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.includes("Unauthorized")
      ) {
        toast.error(t("sessionExpired"));
      } else {
        toast.error(
          error.response?.data?.message || t("errorFetchingVouchers")
        );
      }
    }
  };

  useEffect(() => {
    getListVouchers();
  }, []);

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.discount_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-gray-700 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("voucherStorageTitle")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {t("manageVouchersDescription")}
        </p>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <VoucherTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Voucher List */}
      <div className="grid gap-4">
        {filteredVouchers.map((voucher) => (
          <VoucherCard
            key={voucher._id}
            voucher={voucher}
            onViewDetails={handleViewDetails}
            activeTab={activeTab}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredVouchers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {t("noVouchersFound")}
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <VoucherModal
          voucher={selectedVoucher}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default memo(StorageVoucher);
