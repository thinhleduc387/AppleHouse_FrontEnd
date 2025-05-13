import React, { useEffect, useState } from "react";
import { getListCommentBySpuId } from "../../../config/api";
import CommentItem from "../../Product/Feedback/CommentItem";
import Pagination from "../../Pagiantion";
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

const ProductComments = ({ productId }) => {
  const { t } = useTranslation("comment"); // Sử dụng hook useTranslation để lấy hàm t
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    handleGetListComment();
  }, [productId, currentPage]); // Gộp cả productId và currentPage để tránh lặp useEffect

  const handleGetListComment = async () => {
    const response = await getListCommentBySpuId({
      productId,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    });
    if (response.status === 200) {
      setComments(response.metadata.comments);
      setTotalPages(response.metadata.pagination.totalPages);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full ml-6 h-screen rounded-lg shadow-lg p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        {t("review")} {/* Dịch "Đánh giá" thành "Review" */}
      </h2>
      <div className="flex flex-col justify-between max-h-[85%]">
        {/* Danh sách comment */}
        <div className="flex flex-col gap-2 max-h-[85%] overflow-y-auto pr-2">
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}

          {comments.length === 0 && (
            <div className="text-center text-xl">
              {t("noReviewsYet")}{" "}
              {/* Thêm key mới nếu cần, vì "Chưa có đánh giá nào" không có trong JSON */}
            </div>
          )}
        </div>
        {comments.length > 0 && totalPages > 1 && (
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
