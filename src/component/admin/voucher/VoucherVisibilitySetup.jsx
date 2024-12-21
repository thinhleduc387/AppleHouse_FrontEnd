import React, { useState, useEffect } from "react";
import { getAdminAllProduct } from "../../../config/api";
import ProductSelectionModal from "../flashSale/ProductSeletionModal";

const VoucherVisibilitySetup = ({ voucherData, setVoucherData, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(
    voucherData.discount_product_ids || []
  );
  const [productDetails, setProductDetails] = useState([]);

  // Fetch product details whenever selectedProducts changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProducts.length > 0) {
        try {
          const response = await getAdminAllProduct(selectedProducts);
          setProductDetails(response.metadata || []);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      } else {
        setProductDetails([]);
      }
    };

    fetchProductDetails();
  }, [selectedProducts]);

  const handleVisibilityChange = (value) => {
    setVoucherData({ ...voucherData, discount_isPublic: value });
  };

  const handleAddProducts = (selected) => {
    setSelectedProducts(selected);
    setVoucherData({ ...voucherData, discount_product_ids: selected });
    setIsModalOpen(false); // Close modal after confirming
  };

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Hiển thị mã giảm giá và các sản phẩm áp dụng
      </h2>

      {/* Visibility Settings */}
      <div className="flex items-center mb-8">
        <label className="font-bold text-gray-700 w-1/6">
          Thiết lập hiển thị
        </label>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="public"
              name="visibility"
              className="w-5 h-5 text-mainColor focus:ring-mainColor border-gray-300"
              checked={voucherData.discount_isPublic}
              onChange={() => handleVisibilityChange(true)}
            />
            <label htmlFor="public" className="text-gray-700">
              Hiển thị nhiều nơi
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="private"
              name="visibility"
              className="w-5 h-5 text-mainColor focus:ring-mainColor border-gray-300"
              checked={!voucherData.discount_isPublic}
              onChange={() => handleVisibilityChange(false)}
            />
            <label htmlFor="private" className="text-gray-700">
              {type === "all"
                ? "Không công khai"
                : "Chia sẻ thông qua mã Voucher"}
            </label>
          </div>
        </div>
      </div>

      {!voucherData.discount_isPublic && type !== "all" && (
        <p className="text-sm text-gray-500 mb-6">
          Mã giảm giá của bạn sẽ không được công khai, bạn có thể chia sẻ mã
          giảm giá với người dùng khác.
        </p>
      )}

      {/* Product Selection */}
      <div className="flex items-center mb-6">
        <label className="font-bold text-gray-700 w-1/6">
          Sản phẩm được áp dụng
        </label>
        {type === "all" ? (
          <div className="bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg">
            Tất cả sản phẩm
          </div>
        ) : (
          <button
            className="flex items-center gap-2 border border-mainColor text-mainColor px-4 py-2 rounded-lg hover:bg-mainColor hover:text-white transition"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-xl">+</span> Thêm sản phẩm
          </button>
        )}
      </div>

      {productDetails.length > 0 && (
        <div>
          <table className="w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left">Sản phẩm</th>
                <th className="px-4 py-2 border-b text-left">Original Price</th>
                <th className="px-4 py-2 border-b text-left">Số Lượng Hàng</th>
                <th className="px-4 py-2 border-b text-left">Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((product) => (
                <tr key={product.spu_info._id}>
                  <td className="px-4 py-2 border-b flex items-center gap-4">
                    <img
                      src={product.spu_info.product_thumb}
                      alt={product.spu_info.product_name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span>{product.spu_info.product_name}</span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.spu_info.product_price}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.spu_info.product_quantity}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        handleAddProducts(
                          selectedProducts.filter(
                            (id) => id !== product.spu_info._id
                          )
                        )
                      }
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Selection Modal */}
      <ProductSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddProducts}
        productList={[]}
        setProductList={() => {}}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        flashSaleData={{
          startTime: voucherData.discount_start,
          endTime: voucherData.discount_end,
        }}
      />
    </div>
  );
};

export default VoucherVisibilitySetup;
