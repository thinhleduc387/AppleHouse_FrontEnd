import React, { useEffect, useState } from "react";
import { getListVoucher } from "../../../config/api";
import SearchBar from "./SearchBar";
import VoucherTabs from "./VoucherTabs";
import VoucherCard from "./VoucherCard";

const StorageVoucher = () => {
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
    const response = await getListVoucherForStorageVoucher({
      page: 1,
      limit: 10,
      isPublic: true,
    });

    if (response?.status === 200) {
      setVouchers(response.metadata.discounts);
    }
  };

  useEffect(() => {
    getListVouchers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kho Voucher</h1>
        <p className="text-gray-600 mt-1">Quản lý voucher của bạn</p>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <VoucherTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Voucher List */}
      <div className="grid gap-4">
        {vouchers.map((voucher) => (
          <VoucherCard
            key={voucher._id}
            voucher={voucher}
            onViewDetails={handleViewDetails}
            activeTab={activeTab}
          />
        ))}
      </div>

      {/* Empty State */}
      {vouchers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy voucher nào</p>
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

export default StorageVoucher;
