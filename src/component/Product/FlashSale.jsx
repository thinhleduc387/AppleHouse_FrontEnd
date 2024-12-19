import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductItem from "./ProductItem"; // Đảm bảo đường dẫn đúng với vị trí của ProductCard
import "../../style/snow.css";
import FlashSaleItem from "./FlashSaleItem";
const FlashSale = () => {
  const scrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [totalProductsToShow, setTotalProductsToShow] = useState(4); // Mặc định 4 sản phẩm trên md
  const [timeLeft, setTimeLeft] = useState(3600); // Thời gian flash sale ban đầu (giây)

  const product = {
    id: "123",
    imageSrc:
      "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_37987b6def.png",
    link: "",
    name: "Iphone",
    productPrice: {
      orignalPrice: 900000,
      priceAfterDiscount: 1000000,
      discount: 100,
    },
  };

  // Update thời gian đếm ngược
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Xóa interval khi component bị hủy
  }, []);

  // Tính toán số giờ, phút, giây còn lại
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollRef.current) {
        const firstCard = scrollRef.current.firstChild;
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 16); // Tính chiều rộng của card và khoảng cách
        }
      }
    };

    const handleResize = () => {
      // Điều chỉnh số lượng sản phẩm hiển thị dựa vào kích thước màn hình
      if (window.innerWidth < 640) {
        // sm: Dưới 640px
        setTotalProductsToShow(1); // Hiển thị 1 sản phẩm
      } else if (window.innerWidth < 800) {
        // md: Từ 640px đến dưới 768px
        setTotalProductsToShow(2); // Hiển thị 2 sản phẩm
      } else if (window.innerWidth < 1180) {
        // lg: Từ 768px đến dưới 1024px
        setTotalProductsToShow(3); // Hiển thị 3 sản phẩm
      } else {
        // xl: Từ 1024px đến dưới 1280px
        setTotalProductsToShow(4); // Hiển thị 4 sản phẩm
      }
      updateCardWidth();
    };

    // Cập nhật chiều rộng và số lượng sản phẩm khi component mount
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    <div
      className="p-4 relative rounded-lg"
      style={{
        backgroundImage:
          'url("https://treobangron.com.vn/wp-content/uploads/2022/09/background-tet-2023-2-2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div class="initial-snow">
        {Array.from({ length: 50 }).map((_, index) => (
          <div class="snow">&#x1F9E7;</div>
        ))}
      </div>
      {/* Thời gian flash sale */}
      <div className="flex items-center justify-between bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-4 rounded-lg mb-6 shadow-lg">
        <h2 className="text-2xl font-bold">FLASH SALE - XUÂN 2025</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold uppercase tracking-wider">
            Kết thúc trong:
          </span>
          <div className="flex gap-1">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white text-red-500 rounded-lg text-lg font-bold shadow-inner">
              {formatTime(timeLeft).split(":")[0]}
              <span className="text-xs font-medium text-gray-500">Giờ</span>
            </div>
            <span className="text-xl font-extrabold">:</span>
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white text-red-500 rounded-lg text-lg font-bold shadow-inner">
              {formatTime(timeLeft).split(":")[1]}
              <span className="text-xs font-medium text-gray-500">Phút</span>
            </div>
            <span className="text-xl font-extrabold">:</span>
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white text-red-500 rounded-lg text-lg font-bold shadow-inner">
              {formatTime(timeLeft).split(":")[2]}
              <span className="text-xs font-medium text-gray-500">Giây</span>
            </div>
          </div>
        </div>
      </div>


      {/* Nút điều hướng trái */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-2xl pl-2 z-10 rounded-full shadow-md"
      >
        <FaChevronLeft />
      </button>

      {/* Danh sách sản phẩm */}
      <div className="flex space-x-4 overflow-hidden px-4" ref={scrollRef}>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex-none z-10"
            style={{
              width: `calc((100% - ${
                16 * (totalProductsToShow - 1)
              }px) / ${totalProductsToShow})`,
            }}
          >
            <FlashSaleItem product={product} isForShow={true} />
          </div>
        ))}
      </div>

      {/* Nút điều hướng phải */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-2xl pr-2 rounded-full shadow-md"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default FlashSale;
