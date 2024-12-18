import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import {
  iphoneAttributes,
  ipadAttributes,
  macbookAttributes,
  applewatchAttributes,
  earphonesAttributes,
} from "./AttributesData";

const AddAttributesInfo = ({ category, productData, onUpdateAttributes }) => {
  const [attributes, setAttributes] = useState([]); // Danh sách bộ attributes
  const [expandedGroups, setExpandedGroups] = useState([]); // Nhóm đang mở
  const [defaultLength, setDefaultLength] = useState(0); // Số nhóm cố định
  const [editingGroup, setEditingGroup] = useState(null); // Trạng thái chỉnh sửa tên nhóm
  const [editingPropertyName, setEditingPropertyName] = useState({
    groupIndex: null,
    propertyIndex: null,
  }); // Trạng thái chỉnh sửa thuộc tính

  // Cập nhật attributes và đồng bộ với component cha
  const setAttributesWithCallback = (updatedAttributes) => {
    setAttributes(updatedAttributes);
    if (onUpdateAttributes) {
      onUpdateAttributes(updatedAttributes); // Gửi dữ liệu lên component cha
    }
  };

  useEffect(() => {
    if (!productData.attributes || !productData.attributes.length > 0) {
      if (!category) {
        setAttributes([]);
        setDefaultLength(0);
        return;
      }

      let initialAttributes = [];
      switch (category) {
        case "iPhone":
          initialAttributes = iphoneAttributes;
          break;
        case "iPad":
          initialAttributes = ipadAttributes;
          break;
        case "Mac":
          initialAttributes = macbookAttributes;
          break;
        case "Apple Watch":
          initialAttributes = applewatchAttributes;
          break;
        case "Tai nghe":
          initialAttributes = earphonesAttributes;
          break;
        default:
          initialAttributes = [];
          break;
      }

      // Chuyển đổi structure attributes
      const updatedAttributes = initialAttributes.map((group) => ({
        groupName: group.groupName,
        attributes: group.propertiesName.map((property) => ({
          displayName: property,
          value: "",
        })),
      }));

      setAttributesWithCallback(updatedAttributes);
      setDefaultLength(updatedAttributes.length);
    }
  }, [category]);

  useEffect(() => {
    if (productData.attributes && productData.attributes.length > 0) {
      setAttributes(productData.attributes);
    }
  }, []);

  const handleToggleGroup = (groupName) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((name) => name !== groupName)
        : [...prev, groupName]
    );
  };

  const handleAddNewGroup = () => {
    const newGroupName = `Nhóm mới ${attributes.length + 1}`;
    const newGroupData = {
      groupName: newGroupName,
      attributes: [{ displayName: "Thuộc tính 1", value: "" }],
    };
    setAttributesWithCallback([...attributes, newGroupData]);
    setExpandedGroups([...expandedGroups, newGroupName]);
  };

  const handleAddProperty = (groupIndex) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[groupIndex].attributes.push({
      displayName: `Thuộc tính ${updatedAttributes[groupIndex].attributes.length + 1}`,
      value: "",
    });
    setAttributesWithCallback(updatedAttributes);
  };

  const handleDeleteGroup = (groupIndex) => {
    const updatedAttributes = attributes.filter((_, index) => index !== groupIndex);
    setAttributesWithCallback(updatedAttributes);
  };

  const handleDeleteProperty = (groupIndex, propertyIndex) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[groupIndex].attributes.splice(propertyIndex, 1);
    setAttributesWithCallback(updatedAttributes);
  };

  const handleSaveGroupName = () => setEditingGroup(null);

  const handleSavePropertyName = () => {
    setEditingPropertyName({ groupIndex: null, propertyIndex: null }); // Reset trạng thái chỉnh sửa
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thuộc tính sản phẩm</h2>

      {attributes.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4 border-b last:border-b-0">
          {/* Header Group */}
          <div className="cursor-pointer bg-gray-100 hover:bg-gray-200 flex justify-between items-center px-4 py-3 rounded-md">
            {editingGroup === groupIndex ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={group.groupName}
                  onChange={(e) => {
                    const updatedAttributes = [...attributes];
                    updatedAttributes[groupIndex].groupName = e.target.value;
                    setAttributesWithCallback(updatedAttributes);
                  }}
                  className="border rounded-md px-2 py-1 w-full"
                />
              </div>
            ) : (
              <h3
                className="text-lg font-semibold flex-1"
                onClick={() => handleToggleGroup(group.groupName)}
              >
                {group.groupName}
              </h3>
            )}

            {groupIndex >= defaultLength && (
              <div className="flex gap-2">
                {editingGroup === groupIndex ? (
                  <AiOutlineCheck
                    onClick={() => handleSaveGroupName()}
                    className="text-green-500 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEdit
                    onClick={() => setEditingGroup(groupIndex)}
                    className="text-blue-500 cursor-pointer"
                  />
                )}
                <AiOutlineDelete
                  onClick={() => handleDeleteGroup(groupIndex)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Content */}
          {expandedGroups.includes(group.groupName) && (
            <div className="p-4 bg-gray-50 border-t">
              {group.attributes.map((property, propertyIndex) => (
                <div
                  key={propertyIndex}
                  className="flex items-center gap-4 mb-4"
                >
                  {/* Display Name */}
                  <div className="flex items-center w-1/3">
                    {groupIndex >= defaultLength &&
                    editingPropertyName.groupIndex === groupIndex &&
                    editingPropertyName.propertyIndex === propertyIndex ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={property.displayName}
                          onChange={(e) => {
                            const updatedAttributes = [...attributes];
                            updatedAttributes[groupIndex].attributes[
                              propertyIndex
                            ].displayName = e.target.value;
                            setAttributesWithCallback(updatedAttributes);
                          }}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </div>
                    ) : (
                      <span>{property.displayName}</span>
                    )}
                  </div>

                  {/* Input Value */}
                  <input
                    type="text"
                    value={property.value}
                    onChange={(e) => {
                      const updatedAttributes = [...attributes];
                      updatedAttributes[groupIndex].attributes[propertyIndex].value =
                        e.target.value;
                      setAttributesWithCallback(updatedAttributes);
                    }}
                    className="border rounded-md px-2 py-1 w-2/3"
                  />

                  {/* Edit and Delete Icons */}
                  {groupIndex >= defaultLength && (
                    <div className="flex gap-2">
                      {editingPropertyName.groupIndex === groupIndex &&
                      editingPropertyName.propertyIndex === propertyIndex ? (
                        <AiOutlineCheck
                          onClick={handleSavePropertyName}
                          className="text-green-500 cursor-pointer"
                        />
                      ) : (
                        <AiOutlineEdit
                          onClick={() =>
                            setEditingPropertyName({
                              groupIndex,
                              propertyIndex,
                            })
                          }
                          className="text-blue-500 cursor-pointer"
                        />
                      )}
                      <AiOutlineDelete
                        onClick={() =>
                          handleDeleteProperty(groupIndex, propertyIndex)
                        }
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Add Property */}
              {groupIndex >= defaultLength && (
                <button
                  onClick={() => handleAddProperty(groupIndex)}
                  className="text-blue-500 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white"
                >
                  + Thêm thuộc tính
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Thêm nhóm mới */}
      <div className="mt-4">
        <button
          onClick={handleAddNewGroup}
          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
        >
          Thêm nhóm mới
        </button>
      </div>
    </div>
  );
};

export default AddAttributesInfo;
