import { useEffect, useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "../../style/sideBar.css"; // Import CSS chung

const ProductSideBar = ({ productAttributes, isOpen, setIsOpen }) => {
  const [activeGroup, setActiveGroup] = useState(null); // Trạng thái theo dõi nhóm đang active
  const [isDragging, setIsDragging] = useState(false); // Trạng thái theo dõi kéo chuột
  const [startX, setStartX] = useState(0); // Vị trí bắt đầu kéo
  const [scrollLeft, setScrollLeft] = useState(0); // Vị trí cuộn hiện tại
  const refs = useRef([]); // Tạo một array ref để lưu trữ refs cho từng nhóm
  const groupListRef = useRef(null); // Tham chiếu tới nhóm group list để thay đổi cuộn

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

  const scrollToGroup = (index) => {
    refs.current[index]?.scrollIntoView({
      behavior: "smooth", // Cuộn mượt
      block: "start", // Cuộn đến phần đầu
    });
    setActiveGroup(index);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 1000; // Tính toán vị trí cuộn
    productAttributes.forEach((group, index) => {
      const ref = refs.current[index];
      if (
        ref &&
        ref.offsetTop <= scrollPosition &&
        ref.offsetTop + ref.clientHeight > scrollPosition
      ) {
        setActiveGroup(index); // Cập nhật nhóm đang cuộn đến
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Thêm event listener khi cuộn
    return () => {
      window.removeEventListener("scroll", handleScroll); // Xóa event listener khi component unmount
    };
  }, []);

  // Xử lý sự kiện bắt đầu kéo
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(groupListRef.current.scrollLeft);
  };

  // Xử lý sự kiện kéo chuột
  const onDrag = (e) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    groupListRef.current.scrollLeft = scrollLeft - distance;
  };

  // Xử lý sự kiện kết thúc kéo
  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "overlay-visible" : "overlay-hidden"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title">Thông số kĩ thuật</h3>
          <IoCloseOutline
            onClick={() => setIsOpen(false)}
            className="close-icon"
          />
        </div>
        <hr />
        <div
          ref={groupListRef}
          className="group-list flex flex-row gap-4 m-5 mb-3"
          onMouseDown={startDrag} // Bắt đầu kéo
          onMouseMove={onDrag} // Kéo chuột
          onMouseUp={stopDrag} // Dừng kéo
          onMouseLeave={stopDrag} // Dừng kéo khi rời khỏi phần tử
        >
          {productAttributes.map((group, index) => (
            <button
              key={index}
              onClick={() => scrollToGroup(index)}
              className={`text-lg font-bold mb-2 relative ${
                activeGroup === index ? "text-red-500" : "text-gray-500"
              }`} // Thêm lớp css khi active
            >
              <span className="relative z-10">{group.groupName}</span>
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-transparent hover:bg-red-500"></div>
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-transparent hover:bg-red-500"></div>
            </button>
          ))}
        </div>
        <hr />
        <div className="mr-5 ml-5 sidebar-content">
          {productAttributes.map((group, index) => (
            <div
              key={index}
              className="mt-6"
              ref={(el) => (refs.current[index] = el)}
            >
              <h4 className="text-lg font-bold text-gray-800">
                {group.groupName}
              </h4>
              <table className="w-full table-auto mt-4">
                <tbody className="divide-y divide-gray-300">
                  {group.attributes.map((attribute, index) => (
                    <tr key={index}>
                      <td
                        style={{ width: "60%" }}
                        className="p-2 text-xl text-slate-500 "
                      >
                        {attribute.displayName}
                      </td>
                      <td
                        style={{ width: "40%" }}
                        className="p-2 text-xl text-gray"
                      >
                        {attribute.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductSideBar;
