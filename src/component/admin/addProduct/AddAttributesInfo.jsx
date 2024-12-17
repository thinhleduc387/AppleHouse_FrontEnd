import React, { useState, useEffect } from "react";
import {
  iphoneAttributes,
  ipadAttributes,
  macbookAttributes,
  applewatchAttributes,
  earphonesAttributes,
} from "./AttributesData";

const AddAttributesInfo = ({ category }) => {
  const [attributes, setAttributes] = useState([]); // Danh sách bộ attributes
  const [expandedGroup, setExpandedGroup] = useState(null); // Nhóm đang mở rộng

  // State để thêm bộ mới
  const [newGroupName, setNewGroupName] = useState("");
  const [newProperties, setNewProperties] = useState([""]);

  // Cập nhật bộ attributes dựa trên category
  useEffect(() => {
    if (!category) {
      setAttributes([]);
      return;
    }

    switch (category) {
      case "iPhone":
        setAttributes(iphoneAttributes);
        break;
      case "iPad":
        setAttributes(ipadAttributes);
        break;
      case "MacBook":
        setAttributes(macbookAttributes);
        break;
      case "Apple Watch":
        setAttributes(applewatchAttributes);
        break;
      case "Earphones":
        setAttributes(earphonesAttributes);
        break;
      default:
        setAttributes([]);
        break;
    }
  }, [category]);

  // Toggle expand/collapse group
  const handleToggleGroup = (groupName) => {
    setExpandedGroup((prev) => (prev === groupName ? null : groupName));
  };

  // Xử lý thêm thuộc tính mới
  const handleAddNewGroup = () => {
    if (newGroupName.trim() && newProperties.some((p) => p.trim())) {
      const newGroup = {
        groupName: newGroupName,
        propertiesName: newProperties.filter((p) => p.trim()),
      };

      setAttributes((prev) => [...prev, newGroup]);
      setNewGroupName(""); // Reset input groupName
      setNewProperties([""]); // Reset input propertiesName
    }
  };

  // Thêm ô input cho thuộc tính mới
  const handleAddPropertyInput = () => {
    setNewProperties((prev) => [...prev, ""]);
  };

  // Cập nhật thuộc tính mới
  const handlePropertyChange = (index, value) => {
    const updatedProperties = [...newProperties];
    updatedProperties[index] = value;
    setNewProperties(updatedProperties);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thuộc tính sản phẩm</h2>

      {attributes.map((group, index) => (
        <div key={index} className="mb-4 border-b last:border-b-0">
          {/* Expandable Group Header */}
          <div
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 flex justify-between items-center px-4 py-3 rounded-md"
            onClick={() => handleToggleGroup(group.groupName)}
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {group.groupName}
            </h3>
            <span className="text-xl text-gray-500">
              {expandedGroup === group.groupName ? "−" : "+"}
            </span>
          </div>

          {/* Expandable Content */}
          {expandedGroup === group.groupName && (
            <div className="p-4 bg-gray-50 border-t">
              {group.propertiesName.map((property, idx) => (
                <div key={idx} className="flex items-center mb-3">
                  <label className="w-1/3 text-gray-700 font-medium">
                    {property}:
                  </label>
                  <input
                    type="text"
                    placeholder={`Nhập ${property}`}
                    className="w-2/3 border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Form thêm bộ mới */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Thêm bộ thuộc tính mới</h3>
        <input
          type="text"
          placeholder="Tên nhóm thuộc tính"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="w-full mb-3 border border-gray-300 rounded-md px-3 py-2"
        />
        {newProperties.map((property, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Thuộc tính ${idx + 1}`}
            value={property}
            onChange={(e) => handlePropertyChange(idx, e.target.value)}
            className="w-full mb-2 border border-gray-300 rounded-md px-3 py-2"
          />
        ))}
        <button
          onClick={handleAddPropertyInput}
          className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
        >
          + Thêm thuộc tính
        </button>
        <button
          onClick={handleAddNewGroup}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
        >
          Thêm nhóm
        </button>
      </div>
    </div>
  );
};

export default AddAttributesInfo;
