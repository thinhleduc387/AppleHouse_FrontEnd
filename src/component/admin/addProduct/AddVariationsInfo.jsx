import React, { useState, useEffect } from "react";
import VariationForm from "./VariationForm";
import SkuTable from "./SkuTable";

const AddVariationsInfo = () => {
  const [variationsList, setVariationsList] = useState([]);
  console.log("🚀 ~ AddVariationsInfo ~ variationsList:", variationsList)
  const [sku_list, setSku_list] = useState([]);
  console.log("🚀 ~ AddVariationsInfo ~ sku_list:", sku_list)
  const [price, setPrice] = useState(""); // Giá cho tất cả các SKU
  const [stock, setStock] = useState(""); // Kho cho tất cả các SKU

  const addNewVariation = () => {
    setVariationsList([
      ...variationsList,
      { images: [], name: "", options: [""] },
    ]);
  };

  const removeVariation = (index) => {
    const updatedVariations = variationsList.filter((_, i) => i !== index);
    setVariationsList(updatedVariations);
    generateSkuList(updatedVariations);
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = variationsList.map((variation, i) =>
      i === index ? { ...variation, [field]: value } : variation
    );
    setVariationsList(updatedVariations);
  };

  const handleOptionChange = (variationIndex, optionIndex, value) => {
    const updatedVariations = variationsList.map((variation, i) => {
      if (i === variationIndex) {
        const updatedOptions = [...variation.options];
        updatedOptions[optionIndex] = value;
        return { ...variation, options: updatedOptions };
      }
      return variation;
    });
    setVariationsList(updatedVariations);
  };

  const addOption = (variationIndex) => {
    const updatedVariations = variationsList.map((variation, i) => {
      if (i === variationIndex) {
        if (variation.options[variation.options.length - 1] !== "") {
          return { ...variation, options: [...variation.options, ""] };
        }
      }
      return variation;
    });
    setVariationsList(updatedVariations);
  };

  const removeOption = (variationIndex, optionIndex) => {
    const updatedVariations = variationsList.map((variation, i) => {
      if (i === variationIndex) {
        const updatedOptions = variation.options.filter(
          (_, idx) => idx !== optionIndex
        );
        return { ...variation, options: updatedOptions };
      }
      return variation;
    });
    setVariationsList(updatedVariations);
  };

  const handlePriceChange = (skuIndexId, value) => {
    const updatedSkuList = [...sku_list];
    updatedSkuList[skuIndexId].sku_price = value;
    setSku_list(updatedSkuList);
  };

  const handleStockChange = (skuIndexId, value) => {
    const updatedSkuList = [...sku_list];
    updatedSkuList[skuIndexId].sku_stock = value;
    setSku_list(updatedSkuList);
  };

  const handleImageUpload = (skuIndexId, event) => {
    const updatedSkuList = [...sku_list];
    const files = Array.from(event.target.files); // Chuyển đổi FileList thành mảng

    updatedSkuList[skuIndexId].sku_imgs = [
      ...updatedSkuList[skuIndexId].sku_imgs,
      ...files,
    ];

    setSku_list(updatedSkuList);
  };

  const handleRemoveImage = (skuIndexId, imgIndex) => {
    const updatedSkuList = [...sku_list];
    updatedSkuList[skuIndexId].sku_imgs.splice(imgIndex, 1); // Xóa ảnh tại chỉ số imgIndex
    setSku_list(updatedSkuList);
  };

  const generateSkuList = (variations = variationsList) => {
    const skuList = [];
    const optionsCount = variations.map(
      (variation) => variation.options.length
    );
    const totalCombinations = optionsCount.reduce(
      (acc, count) => acc * count,
      1
    );

    for (let i = 0; i < totalCombinations; i++) {
      const skuIndex = [];
      let combinationIndex = i;

      variations.forEach((variation, index) => {
        const optionIndex = combinationIndex % variation.options.length;
        skuIndex.push(optionIndex);
        combinationIndex = Math.floor(
          combinationIndex / variation.options.length
        );
      });

      skuList.push({
        sku_index: skuIndex,
        sku_price: "",
        sku_stock: "",
        sku_imgs: [],
      });
    }

    setSku_list(skuList);
  };

  const applyToAll = () => {
    const updatedSkuList = sku_list.map((sku) => ({
      ...sku,
      sku_price: price,
      sku_stock: stock,
    }));
    setSku_list(updatedSkuList);
  };

  useEffect(() => {
    generateSkuList();
  }, [variationsList]);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Thông tin phân loại SKU</h2>
      <div className="md:p-10 p-0">
        <div className="flex flex-col md:flex-row ">
          <label className="w-32">Phân loại hàng</label>
          <div className="md:ml-10 ml-0 mt-5 md:mt-0 w-full">
            <div>
              {variationsList.length > 0 && (
                <div>
                  {variationsList.map((variation, index) => (
                    <VariationForm
                      key={index}
                      variation={variation}
                      index={index}
                      onChange={handleVariationChange}
                      onRemove={removeVariation}
                      onOptionChange={handleOptionChange}
                      onAddOption={addOption}
                      onRemoveOption={removeOption}
                    />
                  ))}
                </div>
              )}
              <button
                onClick={addNewVariation}
                className="px-4 py-2 border border-dashed text-mainColor rounded hover:bg-[#f1f6ff]"
              >
                Thêm phân loại mới
              </button>
              {variationsList.length > 0 && (
                <>
                  <div className="mt-4 flex flex-col md:flex-row gap-4">
                    {/* Giá */}
                    <div className="flex items-center md:flex-col md:items-start w-full md:w-1/2 gap-x-4 md:gap-y-2">
                      <label className="font-medium w-24 md:w-full">Giá</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full md:w-full p-2 border rounded"
                      />
                    </div>

                    {/* Kho hàng */}
                    <div className="flex items-center md:flex-col md:items-start w-full md:w-1/2 gap-x-4 md:gap-y-2">
                      <label className="font-medium w-24 md:w-full">
                        Kho hàng
                      </label>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full md:w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyToAll}
                    className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Áp dụng cho tất cả
                  </button>
                </>
              )}

              {variationsList.length > 0 && (
                <SkuTable
                  skuList={sku_list}
                  variationsList={variationsList}
                  onPriceChange={handlePriceChange}
                  onStockChange={handleStockChange}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={handleRemoveImage}
                />
              )}
            </div>
          </div>
        </div>
        {variationsList.length === 0 && (
          <>
            <div className="mt-4 flex flex-col gap-y-6">
              {/* Giá */}
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-y-0">
                <label className="font-medium w-32">Giá</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="md:ml-4 w-full md:w-1/3 p-2 border rounded"
                />
              </div>

              {/* Kho hàng */}
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-y-0">
                <label className="font-medium w-32">Kho hàng</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="md:ml-4 w-full md:w-1/3 p-2 border rounded"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddVariationsInfo;
