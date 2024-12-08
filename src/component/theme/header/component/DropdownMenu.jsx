import { useState, useRef, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { getAllCategory } from "../../../../config/api"; // Đảm bảo đã import hàm getAllCategory

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false); // Đóng dropdown khi chuột rời khỏi
  };

  const handleMouseLeaveSubmenu = () => {
    setSelectedItem(null); // Đóng submenu khi chuột rời khỏi
  };

  // Tính chiều cao của menu dựa trên số lượng mục
  const getMenuHeight = () => {
    return categoryList.length * 40; // Giả sử mỗi mục có chiều cao 40px
  };

  // Gọi API lấy danh mục
  useEffect(() => {
    getCategory(); // Gọi hàm getCategory tại đây
  }, []);

  const getCategory = async () => {
    try {
      // Gọi API lấy danh mục
      const response = await getAllCategory();
      console.log(response.metadata);

      // Kiểm tra nếu phản hồi thành công
      if (response.status === 200 && response.metadata) {
        // Cập nhật danh sách CategoryList với dữ liệu trả về từ API
        const categories = response.metadata.map((category) => ({
          id: category._id, // Hoặc _id, tùy theo cấu trúc của response
          name: category.category_name,
          link: `/${category.category_slug}`, // Giả sử slug là một thuộc tính trong API
          subItems: category.children || [], // Lấy danh sách subItems từ API
        }));

        setCategoryList(categories);
      }
    
    } catch (error) {
      console.error("Get categories error:", error);
    }
  };

  return (
    <div
      className="relative ml-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <button className="flex items-center text-gray-700 font-bold justify-center px-4 py-2 h-full bg-gray-200 rounded-full hover:bg-gray-300 w-36">
        Danh mục
        <MdArrowDropDown />
      </button>
      {dropdownOpen && (
        <div
          className="bg-white text-base z-[45] list-none rounded-l-lg custom-shadow-left w-44 absolute right-0 mt-1"
          style={{ height: getMenuHeight() }}
        >
          <ul className="py-1">
            {categoryList.map((category) => (
              <li
                key={category.id}
                onMouseEnter={() => setSelectedItem(category.id)} // Giữ submenu mở khi di chuột vào mục
                className="relative"
              >
                <a
                  href={category.link} // Sử dụng link từ API
                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                >
                  {category.name} {/* Hiển thị tên danh mục */}
                </a>
              </li>
            ))}
          </ul>
          {/* Hiển thị menu con ở vị trí cố định */}
          {selectedItem && (
            <div
              onMouseEnter={() => setSelectedItem(selectedItem)} // Giữ submenu mở khi di chuột vào submenu
              onMouseLeave={handleMouseLeaveSubmenu} // Đóng cả menu khi rời khỏi submenu
              className="bg-white rounded-r-lg custom-shadow-right absolute top-0 left-full w-max"
              style={{ height: getMenuHeight() }} // Đặt chiều dài cho submenu
            >
              <ul className="py-1 grid grid-cols-4 gap-2">
                {/* Submenu chỉ hiển thị nếu có dữ liệu phụ */}
                {categoryList
                  .find((category) => category.id === selectedItem)
                  ?.subItems?.map((subItem) => (
                    <li key={subItem._id}>
                      <a
                        href={'/products/${category.category_slug}'} // Link sản phẩm trong submenu
                        className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                      >
                        {subItem.category_name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
