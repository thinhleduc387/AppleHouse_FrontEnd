import React, { useState, useRef, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";

const ProductDescription = ({ onClickThongSo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const paragraphRef = useRef(null);

  const maxLines = 5; // Số dòng tối đa bạn muốn hiển thị

  useEffect(() => {
    const checkNumberOfLines = () => {
      if (paragraphRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(paragraphRef.current).lineHeight, 10);
        const totalHeight = paragraphRef.current.scrollHeight;
        const lines = Math.floor(totalHeight / lineHeight);
        setShouldShowMore(lines > maxLines); // Hiển thị "Xem thêm" nếu số dòng vượt quá maxLines
      }
    };

    checkNumberOfLines(); // Kiểm tra số dòng ngay khi component render
    window.addEventListener("resize", checkNumberOfLines); // Cập nhật khi thay đổi kích thước cửa sổ

    return () => {
      window.removeEventListener("resize", checkNumberOfLines); // Clean up listener
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-16 bg-white border-2 rounded-lg p-6 space-y-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
          Thông tin sản phẩm
        </h1>
        <a
          className="text-mainColor cursor-pointer flex items-center hover:text-blue-900"
          onClick={onClickThongSo}
        >
          <span className="text-sm md:text-base font-medium">
            Thông số kỹ thuật
          </span>
          <MdNavigateNext className="text-xl" />
        </a>
      </div>

      <div
        className={`relative overflow-hidden ${!isExpanded ? "max-h-[20rem]" : ""}`} // Giới hạn chiều cao
      >
        <p ref={paragraphRef}>
          Máy giặt cửa trước Samsung Inverter 9kg WW90T634DLE/SV là một thiết bị
          hiện đại, đáp ứng đầy đủ nhu cầu giặt giũ của các hộ gia đình hiện
          nay. Với nhiều công nghệ thông minh như bảng điều khiển AI, ngăn chứa
          nước giặt xả tự động AI Dispenser và hệ thống tạo bọt siêu mịn
          Ecobubble, chiếc máy này mang lại hiệu suất giặt sạch vượt trội, đồng
          thời giúp tiết kiệm thời gian và công sức cho người sử dụng. Khối
          lượng giặt 9kg, tích hợp hơn 20 chương trình giặt đa dạng Máy giặt
          Samsung WW90T634DLE/SV được thiết kế với kiểu dáng cửa trước hiện đại,
          mang đến sự sang trọng cho không gian sống của bạn. Các chi tiết bên
          ngoài được hoàn thiện tỉ mỉ với tông màu trắng thanh lịch, giúp thiết
          bị dễ dàng hòa hợp với mọi phong cách nội thất. Máy có khối lượng giặt
          lên đến 9 kg, phù hợp với những gia đình có từ 3-5 thành viên. Ngoài
          ra, Samsung WW90T634DLE/SV còn được trang bị tới 22 chương trình giặt
          khác nhau, từ giặt nhanh, giặt siêu tốc cho đến giặt êm và giặt nước
          nóng. Vì thế, người dùng có thể linh hoạt trong việc lựa chọn chương
          trình giặt phù hợp với nhu cầu và loại vải của từng trang phục.
        </p>
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/800x0/may_giat_samsung_inverter_9_kg_ww90t634dlesv_1_e03ed38590.jpg"
          alt=""
          className="w-full mb-4"
        />
        <p>
          Bảng điều khiển AI Control đề xuất chế độ giặt thông minh Bảng điều
          khiển AI Control thông minh trên máy giặt Samsung WW90T634DLE/SV có
          chức năng ghi nhớ thói quen giặt giũ, sau đó phân tích và đề xuất các
          chế độ yêu thích mà bạn hay lựa chọn. Chính vì thế, người dùng có thể
          tiết kiệm thời gian trong việc tìm kiếm và tùy chỉnh chế độ giặt mỗi
          lần sử dụng, mang lại sự tiện lợi vượt trội. Bên cạnh đó, màn hình LED
          cho phép hiển thị rõ ràng chức năng dễ hiểu và thân thiện với người
          dùng. Nhờ vậy, bất cứ ai trong gia đình cũng có thể dễ dàng vận hành
          máy để san sẻ gánh nặng việc nhà cho nhau.
        </p>

        {/* Lớp phủ mờ đục nằm ngay dưới */}
        {!isExpanded && shouldShowMore && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent opacity-90 z-10 flex justify-center items-center">
            {/* Nút xem thêm nằm trên lớp phủ */}
            <button
              className="text-blue-500 bg-white font-bold hover:underline border border-gray-300 rounded-full px-4 py-2 mt-5"
              onClick={toggleExpand}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>

      {/* Nút thu gọn khi mở rộng */}
      {isExpanded && shouldShowMore && (
        <div className="flex justify-center mt-4">
          <button
            className="text-blue-500 font-bold hover:underline border border-gray-300 rounded-full px-4 py-2"
            onClick={toggleExpand}
          >
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
