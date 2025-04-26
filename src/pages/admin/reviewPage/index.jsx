import { useState } from "react";
import CustomersInfobox from "../../../component/admin/CustomersInfobox";
import ReviewsScore from "../../../component/admin/ReviewScore";
import { FaUserAlt } from "react-icons/fa";
import ReviewModal from "../../../component/admin/review/ReviewModal";
import ReviewList from "../../../component/admin/review/ReviewList";
import PageHeader from "../../../layout/adminLayout/PageHeader";
import RatingDistribution from "../../../component/admin/review/RatingDistribution";

const ReviewPage = () => {
  const [ratingDistribution] = useState([
    { stars: 5, percentage: 31 },
    { stars: 4, percentage: 43 },
    { stars: 3, percentage: 19 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 7 },
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rita Amber",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita",
      email: "rita@domain.com",
      rating: 4.5,
      comment: "Aliquip reprehenderit enim capio odio cultura vix creator.",
      date: "2024/04/24",
      time: "02:57 PM",
    },
    {
      id: 2,
      name: "Mark Vallance",
      email: "mark@domain.com",
      rating: 2,
      comment: "Cenaculum volup cateria deserno vinum depono aqua.",
      date: "26/04/2025",
      time: "08:54 PM",
    },
    {
      id: 3,
      name: "Sam Lincoln",
      email: "sam@domain.com",
      rating: 5,
      comment:
        "Deprosator turbo demum atrox. Commodo sumo pariatur caries velut cuius veritas usus. Articulus veritas obter.",
      date: "26/04/2025",
      time: "07:22 PM",
    },
    {
      id: 4,
      name: "Grace Mitchell",
      email: "mitchell@domain.com",
      rating: 1,
      comment:
        "Canonicus clamo tradeom. Concido tenetur ars vita. Adiuvo talis sortitus fugit dolore charisma defianco.",
      date: "26/04/2025",
      time: "06:05 PM",
    },
  ]);

  // State for managing selected reviews
  const [selectedReviews, setSelectedReviews] = useState([]);

  // State for managing individual comment popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  // State for managing reply all popup
  const [isReplyAllPopupOpen, setIsReplyAllPopupOpen] = useState(false);
  const [replyAllMessage, setReplyAllMessage] = useState("");

  // State for managing dropdown visibility
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Function to toggle the dropdown
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Function to open the popup with the selected comment
  const openPopup = (comment, reviewId) => {
    setSelectedComment(comment);
    setSelectedReviewId(reviewId);
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedComment("");
    setSelectedReviewId(null);
    setReplyMessage("");
  };

  // Function to open the reply all popup
  const openReplyAllPopup = () => {
    setIsReplyAllPopupOpen(true);
  };

  // Function to close the reply all popup
  const closeReplyAllPopup = () => {
    setIsReplyAllPopupOpen(false);
    setReplyAllMessage("");
  };

  // Function to handle checkbox selection
  const handleSelectReview = (id) => {
    setSelectedReviews((prev) =>
      prev.includes(id)
        ? prev.filter((reviewId) => reviewId !== id)
        : [...prev, id]
    );
  };

  // Function to handle select all reviews
  const handleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map((review) => review.id));
    }
  };

  const handleReplyAll = () => {
    if (replyAllMessage.trim()) {
      const selectedReviewDetails = reviews.filter((review) =>
        selectedReviews.includes(review.id)
      );
      console.log("Sending reply to selected reviews:", {
        reviews: selectedReviewDetails,
        message: replyAllMessage,
      });
      closeReplyAllPopup();
      setSelectedReviews([]);
    } else {
      alert("Please enter a reply message.");
    }
  };

  // Function to handle sending reply to a single review
  const handleReply = () => {
    if (replyMessage.trim()) {
      const review = reviews.find((r) => r.id === selectedReviewId);
      console.log("Sending reply to review:", {
        review,
        message: replyMessage,
      });
      // Here you can integrate an API call to send the reply to the review
      closePopup();
    } else {
      alert("Please enter a reply message.");
    }
  };

  // Function to handle dropdown actions
  const handleAction = (action, review) => {
    setOpenDropdownId(null); // Close the dropdown after selection
    switch (action) {
      case "reply":
        openPopup(review.comment, review.id); // Open the popup to reply
        break;

      case "delete":
        setReviews(reviews.filter((r) => r.id !== review.id));
        console.log(`Deleted review with ID: ${review.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader title="Reviews" />

      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Review Score */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <ReviewsScore score={4.5} />
          </div>

          {/* Customer Info Boxes */}
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

        <ReviewList
          reviews={reviews}
          selectedReviews={selectedReviews}
          onSelectReview={handleSelectReview}
          onSelectAll={handleSelectAll}
          onReplyAll={openReplyAllPopup}
          onOpenPopup={openPopup}
          onToggleDropdown={toggleDropdown}
          onAction={handleAction}
          openDropdownId={openDropdownId}
        />
      </div>

      <ReviewModal
        isOpen={isPopupOpen}
        onClose={closePopup}
        comment={selectedComment}
        replyMessage={replyMessage}
        onReplyChange={setReplyMessage}
        onSendReply={handleReply}
        isReplyAll={false}
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
    </div>
  );
};

export default ReviewPage;
