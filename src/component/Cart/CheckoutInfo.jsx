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

const CheckoutInfo = ({ onSubmit }) => {
  const userId = useSelector((state) => state.account?.user?._id);
  const [address, setAddress] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { orderNote } = useSelector((state) => state.checkout);

  const toggleOpenSideBar = (value) => {
    setIsOpen(value);
    dispatch(setHiddenChatBot(value));
  };

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
    dispatch(setOrderAddress(address));
  }, [address]);

  const handleOnChangeAddress = async () => {
    setIsOpen(true);
    dispatch(setHiddenChatBot(true));
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
        <div className="relative">
          <div
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-red-500 transition-colors cursor-pointer group"
            onClick={handleOnChangeAddress}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900">
                    Địa chỉ giao hàng
                  </h3>
                  {!address && (
                    <span className="px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                      Bắt buộc
                    </span>
                  )}
                </div>
                {address ? (
                  <p className="text-gray-700">{address.fullAddress}</p>
                ) : (
                  <p className="text-gray-500">Chọn địa chỉ giao hàng</p>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>

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
        setAddress={setAddress}
      />
    </div>
  );
};

export default CheckoutInfo;
