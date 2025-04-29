import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDefaultAddress } from "../../config/api";
import ChangeAddressForm from "./ChangeAddressForm";
import { setHiddenChatBot } from "../../redux/slices/chatBotSlice";
import { MapPin, FileText, ChevronRight } from "lucide-react";
import {
  setOrderAddress,
  setOrderNotes,
} from "../../redux/slices/checkoutSlice";
import { useTranslation } from "react-i18next";
const CheckoutInfo = ({ onSubmit }) => {
  const { t } = useTranslation("cart");
  const userId = useSelector((state) => state.account?.user?._id);
  const [address, setAddress] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [guestAddress, setGuestAddress] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    streetAddress: "",
  });

  const dispatch = useDispatch();

  const { orderNote } = useSelector((state) => state.checkout);

  const toggleOpenSideBar = (value) => {
    setIsOpen(value);
    dispatch(setHiddenChatBot(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      setAddressError(true);
      document
        .querySelector(".address-field")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setAddressError(false);
    onSubmit(formData);
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
    dispatch(setOrderAddress(address));
  }, [address]);

  const handleOnChangeAddress = async () => {
    setIsOpen(true);
    dispatch(setHiddenChatBot(true));
  };

  const handleGuestAddressChange = (e) => {
    const { name, value } = e.target;
    setGuestAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Create full address for guest
    if (["province", "district", "ward", "streetAddress"].includes(name)) {
      const fullAddress =
        `${guestAddress.streetAddress}, ${guestAddress.ward}, ${guestAddress.district}, ${guestAddress.province}`.trim();
      setAddress({ ...guestAddress, fullAddress });
      dispatch(setOrderAddress({ ...guestAddress, fullAddress }));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-2 bg-red-50 rounded-full">
          <MapPin className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Thông tin nhận hàng
          </h2>
          <p className="text-sm text-gray-500">
            Vui lòng chọn địa chỉ giao hàng
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {userId ? (
          <div className="relative address-field">
            <div
              className={`p-4 bg-gray-50 border rounded-lg cursor-pointer group transition-all duration-200
                ${
                  addressError
                    ? "border-red-500 bg-red-50/50"
                    : "border-gray-200 hover:border-red-500"
                }`}
              onClick={handleOnChangeAddress}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-gray-900">
                      Địa chỉ giao hàng
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        !address
                          ? "text-red-600 bg-red-50"
                          : "text-green-600 bg-green-50"
                      }`}
                    >
                      {!address ? "Bắt buộc" : "Đã chọn"}
                    </span>
                  </div>
                  <div className="flex">
                    <ChevronRight
                      className={`w-5 h-5 transition-colors ${
                        addressError
                          ? "text-red-500"
                          : "text-gray-400 group-hover:text-red-500"
                      }`}
                    />
                    <span className="text-2sm text-slate-600">
                      {address?.fullAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {addressError && (
              <p className="mt-2 text-sm text-red-600">
                Vui lòng chọn địa chỉ giao hàng trước khi tiếp tục
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={guestAddress.fullName}
                  onChange={handleGuestAddressChange}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={guestAddress.phone}
                  onChange={handleGuestAddressChange}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tỉnh/Thành phố
                </label>
                <input
                  type="text"
                  name="province"
                  value={guestAddress.province}
                  onChange={handleGuestAddressChange}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập tỉnh/thành phố"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quận/Huyện
                </label>
                <input
                  type="text"
                  name="district"
                  value={guestAddress.district}
                  onChange={handleGuestAddressChange}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập quận/huyện"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phường/Xã
                </label>
                <input
                  type="text"
                  name="ward"
                  value={guestAddress.ward}
                  onChange={handleGuestAddressChange}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nhập phường/xã"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ cụ thể
              </label>
              <input
                type="text"
                name="streetAddress"
                value={guestAddress.streetAddress}
                onChange={handleGuestAddressChange}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Nhập số nhà, tên đường"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">
              Ghi chú đơn hàng
            </label>
          </div>
          <textarea
            name="note"
            value={orderNote}
            onChange={(e) => dispatch(setOrderNotes(e.target.value))}
            placeholder="Ví dụ: Thời gian nhận hàng, chỉ dẫn địa điểm..."
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            rows="3"
          />
        </div>
      </form>

      <ChangeAddressForm
        isOpen={isOpen}
        setIsOpen={toggleOpenSideBar}
        setAddress={(addr) => {
          setAddress(addr);
          setAddressError(false);
        }}
      />
    </div>
  );
};

export default CheckoutInfo;
