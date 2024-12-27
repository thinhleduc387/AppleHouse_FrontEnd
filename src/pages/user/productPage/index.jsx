import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterSidebar from "../../../component/Product/FilterSidebar";
import ProductItem from "../../../component/Product/ProductItem";
import SortButton from "../../../component/Product/SortButton"; // Import SortButton
import { SortOptions } from "../../../component/Product/SortButton/sortOption"; // Import constants
import { filterProduct } from "../../../config/api";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ITEMS_PER_PAGE = 6; // Số lượng sản phẩm mỗi trang

const ProductPage = () => {
  const { categorySlug } = useParams();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(SortOptions.newest);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); // Thêm state cho trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Thêm state cho tổng số trang

  const handleGetListProduct = async () => {
    setLoading(true); // Start loading
    const response = await filterProduct({
      categorySlug,
      minPrice,
      maxPrice,
      sortBy: selectedOption,
    });
    if (response && response.status === 200) {
      const products = response.metadata.map((product) => ({
        id: product._id,
        name: product?.product_name,
        imageSrc: product?.product_thumb,
        productPrice: product?.product_price,
        link: `/products/${product?.product_slug}`,
      }));

      setProductList(products);

      // Cập nhật tổng số trang dựa trên số lượng sản phẩm và số lượng sản phẩm mỗi trang
      setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
    }
    setLoading(false); // Stop loading
  };

  // Lấy danh sách sản phẩm theo trang
  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return productList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Hàm xử lý mở/đóng dropdown
  const toggleSortDropdown = () => {
    setIsSortDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    handleGetListProduct();
  }, [categorySlug, minPrice, maxPrice, selectedOption]);

  return (
    <section className="bg-[#f3f4f6] antialiased">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex gap-6">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {categorySlug}
              </h3>
              <SortButton
                isSortDropdownOpen={isSortDropdownOpen}
                toggleSortDropdown={toggleSortDropdown}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : productList.length === 0 ? (
              <div className="text-center text-lg text-gray-600">
                Không tìm thấy sản phẩm nào
              </div>
            ) : (
              <>
                {/* Grid Sản Phẩm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {paginatedProducts().map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      isEdit={false}
                    />
                  ))}
                </div>

                {/* Phân Trang */}
                <ul className="flex space-x-5 justify-center mt-6">
                  {/* Nút Previous */}
                  <li
                    className={`flex items-center justify-center bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                  >
                    <AiOutlineLeft className="text-gray-500" />
                  </li>

                  {/* Số Trang */}
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <li
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex items-center justify-center w-9 h-9 rounded-md cursor-pointer ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </li>
                    )
                  )}

                  {/* Nút Next */}
                  <li
                    className={`flex items-center justify-center bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                  >
                    <AiOutlineRight className="text-gray-500" />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="py-10"></div>
    </section>
  );
};

export default ProductPage;
