import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductItem from "../Product/ProductItem";
import { getRecommendCBF, getRecommendNCF } from "../../config/api";

const ProductSection = ({ title = "Gợi ý hôm nay", productId }) => {
  const scrollRef = useRef(null);
  const [totalProductsToShow, setTotalProductsToShow] = useState(4);
  const [listProduct, setListProduct] = useState([]);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  useEffect(() => {
    const handleGetLsitProduct = async () => {
      let response;
      if (productId) {
        response = await getRecommendCBF({ productId });
      } else {
        response = await getRecommendNCF();
      }

      if (response.status === 200) {
        const productsMap = response.metadata.map((product) => {
          return {
            id: product._id,
            imageSrc: product.product_thumb,
            link: `/products/${product?.product_slug}`,
            name: product.product_name,
            productPrice: {
              originalPrice: product.product_price.originalPrice,
              priceAfterDiscount: product.product_price.priceAfterDiscount,
              discount: product.product_price.discount,
            },
            rating: product?.product_ratingAverage,
            tags: product?.product_tags,
          };
        });
        setListProduct(productsMap);
      }
    };
    handleGetLsitProduct();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTotalProductsToShow(1);
      } else if (window.innerWidth < 800) {
        setTotalProductsToShow(2);
      } else if (window.innerWidth < 1180) {
        setTotalProductsToShow(3);
      } else {
        setTotalProductsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsLeftVisible(scrollLeft > 10);
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Gọi ngay để cập nhật trạng thái ban đầu
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [listProduct]); // Thêm listProduct vào dependency

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-8 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className={`p-3 rounded-full transition-all duration-300 ${
              isLeftVisible
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isLeftVisible}
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className={`p-3 rounded-full transition-all duration-300 ${
              isRightVisible
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isRightVisible}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        ref={scrollRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {listProduct.map((product, index) => (
          <div
            key={product.id}
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            style={{
              width: `calc((100% - ${
                16 * (totalProductsToShow - 1)
              }px) / ${totalProductsToShow})`,
              minWidth: "250px", // Đảm bảo width tối thiểu
            }}
          >
            <ProductItem product={product} isForShow={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
