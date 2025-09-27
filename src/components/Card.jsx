import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowUp, faAdd } from "@fortawesome/free-solid-svg-icons";

// Utilities
const normalizeKey = (label) =>
  label
    .toLowerCase()
    .split(" ")
    .map((word, idx) =>
      idx === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

const normalizeDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
};

const Card = ({
  list,
  title,
  personData,
  addPersonalInfo,
  addEducation,
  addExperience,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({});

  // Sync form with parent data
  useEffect(() => {
    if (title === "Personal Info") {
      setFormData(personData || {});
    } else if (
      (title === "Education" || title === "Experience") &&
      !personData?.length
    ) {
      setFormData({});
      setShowDetails(false);
      setSelectedIndex(null);
    }
  }, [personData, title]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (title === "Personal Info") addPersonalInfo(updated); // live update
  };

  const handleSave = () => {
    if (title === "Education") addEducation(formData, selectedIndex);
    if (title === "Experience") addExperience(formData, selectedIndex);

    resetForm();
  };

  const handleDelete = () => {
    if (selectedIndex === null) return;
    if (title === "Education") addEducation(null, selectedIndex, true);
    if (title === "Experience") addExperience(null, selectedIndex, true);

    resetForm();
  };

  const resetForm = () => {
    setShowDetails(false);
    setSelectedIndex(null);
    setFormData({});
  };

  // Render list of existing entries (Education/Experience)
  const renderListItems = () =>
    personData?.map((item, idx) => {
      const label =
        title === "Education"
          ? item.school || "Unnamed School"
          : item.companyName || "Company";

      return (
        <div
          key={idx}
          className="font-body w-full px-3 py-2 rounded-xl shadow-sm border border-gray-200 bg-gray-50 
            text-sm font-medium text-gray-800 hover:bg-gray-100 hover:shadow-md 
            cursor-pointer transition-all duration-200"
          onClick={() => {
            setShowDetails(true);
            setSelectedIndex(idx);
            setFormData(item);
          }}
        >
          {label}
        </div>
      );
    });

  // Render a form field
  const renderField = (item, idx) => {
    const key = normalizeKey(item);
    const id = `${title}-${key}`;
    const value = formData[key] || "";
    const isTextarea = item === "Description";
    const isDate = item.includes("Date");

    return (
      <div key={idx} className="mb-3 w-full">
        <label htmlFor={id} className="font-body font-bold text-sm mb-2 block">
          {item}
        </label>

        {isTextarea ? (
          <textarea
            id={id}
            rows={4}
            required
            placeholder={`Enter ${item}`}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="bg-background rounded w-full p-2 mt-1 text-sm resize-y border border-gray-300"
          />
        ) : (
          <input
            id={id}
            required
            type={
              item === "Email"
                ? "email"
                : item === "Phone Number"
                ? "tel"
                : isDate
                ? "date"
                : "text"
            }
            placeholder={item === "Address" ? "City, Country" : `Enter ${item}`}
            value={isDate ? normalizeDate(value) : value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="bg-background rounded w-full p-2 mt-1 text-sm border border-gray-300"
          />
        )}
      </div>
    );
  };

  return (
    <section className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-xl border-b-2 w-fit flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-700" />
          {title}
        </h2>
        {title !== "Personal Info" && (
          <FontAwesomeIcon
            icon={faArrowUp}
            className={`text-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 ${
              expanded ? "rotate-180" : ""
            }`}
            onClick={() => setExpanded(!expanded)}
          />
        )}
      </header>

      {/* Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          title === "Personal Info" || expanded
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0"
        }`}
      >
        {/* List view */}
        {!showDetails && title !== "Personal Info" && (
          <div className="flex flex-col items-center gap-3">
            {renderListItems()}
            <button
              className="mb-4 px-3 py-1 rounded-3xl text-sm border border-gray-400 hover:bg-gray-100 transition"
              onClick={() => {
                setShowDetails(true);
                setSelectedIndex(null);
                setFormData({});
              }}
            >
              <FontAwesomeIcon icon={faAdd} className="mr-1" />
              Add {title}
            </button>
          </div>
        )}

        {/* Form view */}
        {(showDetails || title === "Personal Info") &&
          list.map((item, idx) => renderField(item, idx))}

        {/* Actions */}
        {title !== "Personal Info" && showDetails && (
          <div className="flex justify-between gap-3 mt-4">
            {selectedIndex !== null && (
              <button
                onClick={handleDelete}
                className="text-red-500 border-2 border-red-500 px-3 py-1 rounded text-sm transition-transform hover:scale-105"
              >
                Delete
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm transition-transform hover:scale-105"
              >
                Save
              </button>
              <button
                onClick={resetForm}
                className="border-2 border-gray-700 px-3 py-1 rounded text-sm transition-transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Card;
