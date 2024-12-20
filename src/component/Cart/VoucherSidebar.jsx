import { useEffect, useState, useRef } from "react";
import "../../style/sideBar.css";
import { X, ChevronRight, Plus } from "lucide-react";
const VoucherSideBar = ({ isOpen, setIsOpen }) => {
  const [selectedOffers, setSelectedOffers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const offers = [
    {
      id: 1,
      title:
        "Tặng mã ưu đãi giảm ngay 3% khi mua Máy tính bảng, Đồng hồ thông minh, Điện máy",
      isActive: true,
    },
    {
      id: 2,
      title: "Giảm ngay 600,000đ áp dụng đến 23/12",
      subtitle:
        "Áp dụng cho Macbook Air 13 M2 2024 8CPU/8GPU/16GB/256GB Xám MC7U4SA/A",
      isActive: true,
    },
    {
      id: 3,
      title:
        "Tặng phiếu mua hàng 150,000đ mua Balo, Túi chống sốc (Hạn sử dụng 15 ngày)",
      subtitle:
        "Áp dụng cho Macbook Air 13 M2 2024 8CPU/8GPU/16GB/256GB Xám MC7U4SA/A",
      isActive: true,
    },
    {
      id: 4,
      title: "Tiết kiệm 600,000đ khi mua Microsoft 365 Personal kèm thiết bị",
      subtitle:
        "Áp dụng cho Macbook Air 13 M2 2024 8CPU/8GPU/16GB/256GB Xám MC7U4SA/A",
      isActive: true,
    },
  ];

  const handleOfferToggle = (offerId) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers(selectedOffers.filter((id) => id !== offerId));
    } else {
      setSelectedOffers([...selectedOffers, offerId]);
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div
            className={`absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Khuyến mãi và ưu đãi</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(100%-64px)]">
              <div className="flex-1 overflow-y-auto p-4">
                {/* Promo Code Input */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá của bạn tại đây nhé"
                      className="w-full bg-transparent text-sm placeholder:text-gray-500 focus:outline-none"
                    />
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Offers Section */}
                <h3 className="text-base font-semibold mb-4">Khuyến mãi</h3>
                <div className="space-y-3">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      onClick={() => handleOfferToggle(offer.id)}
                      className="group flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                    >
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-500 font-medium">%</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 leading-5">
                          {offer.title}
                        </p>
                        {offer.subtitle && (
                          <p className="text-sm text-gray-500 mt-1 leading-5">
                            {offer.subtitle}
                          </p>
                        )}
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          offer.isActive
                            ? "bg-red-500"
                            : "border-2 border-gray-300 group-hover:border-gray-400"
                        }`}
                      >
                        {offer.isActive ? (
                          <span className="text-white text-sm">✓</span>
                        ) : (
                          <Plus className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t bg-white p-4 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">
                    Đã chọn {selectedOffers.length} khuyến mãi và ưu đãi
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-red-500">
                      24.489.000 đ
                    </p>
                    <p className="text-sm text-gray-600">Tiết kiệm 600.000 đ</p>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherSideBar;
