import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Thêm useTranslation
import ProductItem from "../../../component/Product/ProductItem";
import SortButton from "../../../component/Product/SortButton";
import FilterSidebar from "../../../component/Product/FilterSidebar";
import { SortOptions } from "../../../component/Product/SortButton/sortOption";
import { getPromotionById } from "../../../config/api";

const PromotionPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("promotion"); // Sử dụng namespace promotion

  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [promotion, setPromotion] = useState({});

  const handleFetchPromotion = async () => {
    setLoading(true);
    try {
      const response = await getPromotionById(id);
      if (response.status === 200) {
        setPromotion(response.metadata);

        const products = response.metadata.appliedProduct.map((product) => ({
          id: product._id,
          name: product?.product_name,
          imageSrc: product?.product_thumb,
          productPrice: product?.product_price,
          link: `/products/${product?.product_slug}`,
          rating: product?.product_ratingAverage,
          tags: product?.product_tags,
        }));
        console.log("🚀 ~ products ~ products:", products);
        setProductList(products);
      }
    } catch (error) {
      console.error("Error fetching promotion:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPromotion();
  }, [id]);

  return (
    <section className="bg-[#f3f4f6] dark:bg-gray-900 antialiased transition-colors duration-300">
      <div className="mx-auto max-w-screen-xl">
        {/* Updated banner section */}
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-b-lg shadow-md dark:shadow-gray-700 mb-6">
          {promotion?.prom_banner ? (
            <img
              src={promotion.prom_banner}
              alt="Promotion Banner"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex justify-center items-center text-white text-xl sm:text-2xl font-bold">
              {promotion?.prom_name || t("loadingPromotion")}
            </div>
          )}
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white"></h3>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-blue-400"></div>
              </div>
            ) : productList.length === 0 ? (
              <div className="text-center text-lg text-gray-600 dark:text-gray-300">
                {t("noProductsFound")}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                {productList.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    isEdit={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-10"></div>
    </section>
  );
};

export default PromotionPage;
