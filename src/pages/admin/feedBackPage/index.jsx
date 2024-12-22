import React, { useState } from "react";
import ProductList from "../../../component/admin/comment/ProductList";
import ProductComments from "../../../component/admin/comment/ProductComment";

const FeedBackPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(); // Selected product _id
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Đăng Khoa",
      date: "2024-04-01 10:59",
      content: "Ummmmmm ngon nha",
      rating: 5,
      replies: [],
    },
    {
      id: 2,
      user: "Mỹ Hoàng",
      date: "2024-04-01 10:59",
      content: "Quá ngon",
      rating: 5,
      replies: [],
    },
  ]); // Reviews of the selected product

  return (
    <div className="flex w-full min-h-screen p-8">
      <ProductList
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <ProductComments
        productId={selectedProduct} // Pass selected product _id
        reviews={reviews}
        setReviews={setReviews}
      />
    </div>
  );
};

export default FeedBackPage;
