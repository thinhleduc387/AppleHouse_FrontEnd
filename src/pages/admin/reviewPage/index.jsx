import { useEffect, useState } from "react";
import CustomersInfobox from "../../../component/admin/CustomersInfobox";
import ReviewsScore from "../../../component/admin/ReviewScore";
import { FaUserAlt } from "react-icons/fa";
import ReviewModal from "../../../component/admin/review/ReviewModal";
import ReviewList from "../../../component/admin/review/ReviewList";
import PageHeader from "../../../layout/adminLayout/PageHeader";
import RatingDistribution from "../../../component/admin/review/RatingDistribution";
import { createComment, getListCommentByAdmin } from "../../../config/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ViewDetailsModal from "../../../component/admin/review/ViewDetailsModal";
import Pagination from "../../../component/Pagiantion";

// Placeholder for fetching product details (replace with actual API)
const getProductById = async (productId) => {
  // Simulated API call - replace with real implementation
  return {
    metadata: {
      _id: productId,
      name: "Sample Product",
      image: "https://via.placeholder.com/150",
      description: "This is a sample product description.",
    },
  };
};

const ITEMS_PER_PAGE = 7;

const ReviewPage = () => {
  const [ratingDistribution] = useState([
    { stars: 5, percentage: 31 },
    { stars: 4, percentage: 43 },
    { stars: 3, percentage: 19 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 7 },
  ]);

  const userId = useSelector((state) => state.account?.user?._id);
  const [reviews, setReviews] = useState(null);
  const [sort, setSort] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyAllPopupOpen, setIsReplyAllPopupOpen] = useState(false);
  const [replyAllMessage, setReplyAllMessage] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isLoadingReply, setIsLoadingReply] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const openReplyPopup = (review) => {
    setSelectedReview(review);
    setIsReplyPopupOpen(true);
  };

  const closeReplyPopup = () => {
    setIsReplyPopupOpen(false);
    setSelectedReview(null);
    setReplyMessage("");
  };

  const openViewDetailsPopup = (review, productData) => {
    setSelectedReview(review);
    setProductDetails(productData);
    setIsViewDetailsOpen(true);
  };

  const closeViewDetailsPopup = () => {
    setIsViewDetailsOpen(false);
    setSelectedReview(null);
    setProductDetails(null);
  };

  const openReplyAllPopup = () => {
    setIsReplyAllPopupOpen(true);
  };

  const closeReplyAllPopup = () => {
    setIsReplyAllPopupOpen(false);
    setReplyAllMessage("");
  };

  const handleSelectReview = (id) => {
    setSelectedReviews((prev) =>
      prev.includes(id)
        ? prev.filter((reviewId) => reviewId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map((review) => review._id));
    }
  };

  const handleReplyAll = async () => {
    if (!replyAllMessage.trim()) {
      toast.error("Please enter a reply message.");
      return;
    }

    try {
      const selectedReviewDetails = reviews.filter((review) =>
        selectedReviews.includes(review._id)
      );

      await Promise.all(
        selectedReviewDetails.map(async (selectedReview) => {
          await createComment({
            productId: selectedReview.comment_productId,
            userId: userId,
            content: replyAllMessage,
            parentCommentId: selectedReview._id,
          });
        })
      );

      closeReplyAllPopup();
      setSelectedReviews([]);
      toast.success("All replies sent successfully!");
    } catch (error) {
      console.error("Error creating comments:", error);
      toast.error("Failed to send one or more replies. Please try again.");
    }
  };

  const handleReply = async () => {
    if (replyMessage.trim()) {
      setIsLoadingReply(true);
      const response = await createComment({
        productId: selectedReview.comment_productId,
        userId: userId,
        content: replyMessage,
        parentCommentId: selectedReview._id,
      });

      if (response && response.metadata) {
        toast.success("Reply sent successfully");
      } else {
        toast.error("An error occurred");
      }
      closeReplyPopup();
      setIsLoadingReply(false);
    } else {
      toast.error("Please enter a reply message.");
    }
  };

  const handleAction = async (action, review) => {
    setOpenDropdownId(null);
    switch (action) {
      case "reply":
        openReplyPopup(review);
        break;
      case "view":
        try {
          const productResponse = await getProductById(
            review.comment_productId
          );
          if (productResponse && productResponse.metadata) {
            openViewDetailsPopup(review, productResponse.metadata);
          } else {
            toast.error("Failed to load product details.");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
          toast.error("Failed to load product details.");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getListReview = async () => {
      setLoading(true);
      const response = await getListCommentByAdmin({
        sort,
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      });

      if (response && response.metadata) {
        const { pagination, reviews } = response.metadata;
        setReviews(reviews);
        setTotalPages(pagination.totalPages);
        setLoading(false);
      }
    };

    getListReview();
  }, [sort, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader title="Reviews" />

      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <ReviewsScore score={4.5} />
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CustomersInfobox
                label="Total"
                count={348}
                color="green"
                icon={FaUserAlt}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CustomersInfobox
                label="New"
                count={25}
                suffix="%"
                iconClass="user-plus-solid"
                icon={FaUserAlt}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CustomersInfobox
                label="Regular"
                count={75}
                suffix="%"
                color="red"
                iconClass="user-group-crown-solid"
                icon={FaUserAlt}
              />
            </div>
          </div>
          <RatingDistribution distribution={ratingDistribution} />
        </div>

        {reviews && (
          <ReviewList
            reviews={reviews}
            selectedReviews={selectedReviews}
            onSelectReview={handleSelectReview}
            onSelectAll={handleSelectAll}
            onReplyAll={openReplyAllPopup}
            onOpenPopup={openReplyPopup}
            onToggleDropdown={toggleDropdown}
            onAction={handleAction}
            openDropdownId={openDropdownId}
            setSort={setSort}
            loading={loading}
          />
        )}
      </div>

      <ReviewModal
        isOpen={isReplyPopupOpen}
        onClose={closeReplyPopup}
        selectedReview={selectedReview}
        replyMessage={replyMessage}
        onReplyChange={setReplyMessage}
        onSendReply={handleReply}
        isReplyAll={false}
        isLoadingReply={isLoadingReply}
      />

      <ReviewModal
        isOpen={isReplyAllPopupOpen}
        onClose={closeReplyAllPopup}
        replyMessage={replyAllMessage}
        onReplyChange={setReplyAllMessage}
        onSendReply={handleReplyAll}
        isReplyAll={true}
        selectedCount={selectedReviews.length}
      />

      <ViewDetailsModal
        isOpen={isViewDetailsOpen}
        onClose={closeViewDetailsPopup}
        selectedReview={selectedReview}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ReviewPage;
