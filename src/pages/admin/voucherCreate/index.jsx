import { useState } from "react";
import { useParams } from "react-router-dom";
import VoucherBasicInfo from "../../../component/admin/voucher/VoucherBasicInfo";
import VoucherDiscountSetup from "../../../component/admin/voucher/VoucherDiscountSetup";
import VoucherVisibilitySetup from "../../../component/admin/voucher/VoucherVisibilitySetup";

const VoucherCreate = () => {
  const { type } = useParams();
  const [voucherData, setVoucherData] = useState({
    discount_applies_to: type,
    discount_code: "",
    discount_description: "",
    discount_end: "",
    discount_isPublic: false,
    discount_is_active: false,
    discount_max_uses: 0,
    discount_max_uses_per_user: 0,
    discount_min_order_value: 0,
    discount_name: "",
    discount_product_ids: [],
    discount_start: "",
    discount_type: "",
    discount_user_used: [],
    discount_uses_count: 0,
    discount_value: 0,
  });
  console.log("🚀 ~ VoucherCreate ~ voucherData:", voucherData);

  return (
    <div className="flex flex-col w-full space-y-8">
      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <VoucherBasicInfo
          voucherData={voucherData}
          setVoucherData={setVoucherData}
          type={type}
        />
      </div>

      {/* Discount Setup Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <VoucherDiscountSetup
          voucherData={voucherData}
          setVoucherData={setVoucherData}
        />
      </div>
      {/* Visibility Setup Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <VoucherVisibilitySetup
          voucherData={voucherData}
          setVoucherData={setVoucherData}
          type={voucherData.discount_applies_to}
        />
      </div>
    </div>
  );
};

export default VoucherCreate;
