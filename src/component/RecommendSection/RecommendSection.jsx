import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductItem from "../Product/ProductItem";
import { getRecommendNCF } from "../../config/api";

const ProductSection = ({ title = "Gợi ý hôm nay" }) => {
  const scrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [totalProductsToShow, setTotalProductsToShow] = useState(4);
  const [listProduct, setListProduct] = useState([]);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  useEffect(() => {
    const handleGetLsitProduct = async () => {
      const response = await getRecommendNCF();
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
    const updateCardWidth = () => {
      if (scrollRef.current) {
        const firstCard = scrollRef.current.firstChild;
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 16);
        }
      }
    };

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
      updateCardWidth();
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
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -cardWidth * totalProductsToShow,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: cardWidth * totalProductsToShow,
      behavior: "smooth",
    });
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
                ? "bg-blue-600 text-white hover:bg-blue-700"
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
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isRightVisible}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        ref={scrollRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {listProduct.map((product, index) => (
          <div
            key={product.id}
            className="flex-none transition-transform duration-300 hover:scale-105"
            style={{
              width: `calc((100% - ${
                16 * (totalProductsToShow - 1)
              }px) / ${totalProductsToShow})`,
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
