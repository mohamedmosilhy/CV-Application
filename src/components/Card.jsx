import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowUp, faAdd } from "@fortawesome/free-solid-svg-icons";

// Utility: Convert "Start Date" -> "startDate"
const normalizeKey = (label) => {
  return label
    .toLowerCase()
    .split(" ")
    .map((word, idx) =>
      idx === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

// Utility: Ensure valid date format (YYYY-MM-DD)
const normalizeDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

const Card = ({
  list,
  title,
  personData,
  addPersonalInfo,
  addEducation,
  addExperience,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [formData, setFormData] = React.useState({}); // form state

  // Keep formData in sync with parent data for Personal Info
  React.useEffect(() => {
    if (title === "Personal Info") {
      setFormData(personData || {});
    }
  }, [personData, title]);

  // Handle input change
  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    if (title === "Personal Info") {
      addPersonalInfo(newData); // instant update
    }
  };

  // Save handler (for Education + Experience)
  const handleSave = () => {
    if (title === "Education") {
      addEducation(formData, selectedIndex);
    } else if (title === "Experience") {
      addExperience(formData, selectedIndex);
    }
    setShowDetails(false);
    setSelectedIndex(null);
    setFormData({});
  };

  // Delete handler
  const handleDelete = () => {
    if (selectedIndex === null) return; // new unsaved item
    if (title === "Education") {
      addEducation(null, selectedIndex, true);
    } else if (title === "Experience") {
      addExperience(null, selectedIndex, true);
    }
    setShowDetails(false);
    setSelectedIndex(null);
    setFormData({});
  };

  return (
    <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-xl border-b-2 w-fit flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-700" />
          {title}
        </h2>
        {title !== "Personal Info" && (
          <FontAwesomeIcon
            icon={faArrowUp}
            className={`text-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setExpanded(!expanded)}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          title === "Personal Info"
            ? "opacity-100 max-h-screen"
            : expanded
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0"
        }`}
      >
        {/* List view */}
        {!showDetails && title !== "Personal Info" && (
          <div className="flex justify-center gap-3 flex-col items-center">
            <div className="w-full flex justify-center gap-3 flex-col items-center">
              {title === "Education" &&
                personData?.map((edu, idx) => (
                  <div
                    key={idx}
                    className="font-body w-full px-3 py-2 rounded-xl shadow-sm border border-gray-200 bg-gray-50 
                      text-sm font-medium text-gray-800 hover:bg-gray-100 hover:shadow-md 
                      cursor-pointer transition-all duration-200"
                    onClick={() => {
                      setShowDetails(true);
                      setSelectedIndex(idx);
                      setFormData(edu);
                    }}
                  >
                    {edu.school || "Unnamed School"}
                  </div>
                ))}

              {title === "Experience" &&
                personData?.map((exp, idx) => (
                  <div
                    key={idx}
                    className="font-body w-full px-3 py-2 rounded-xl shadow-sm border border-gray-200 bg-gray-50 
                      text-sm font-medium text-gray-800 hover:bg-gray-100 hover:shadow-md 
                      cursor-pointer transition-all duration-200"
                    onClick={() => {
                      setShowDetails(true);
                      setSelectedIndex(idx);
                      setFormData(exp);
                    }}
                  >
                    {exp.companyName || "Company"}
                  </div>
                ))}
            </div>

            {/* Add Button */}
            <button
              className="mb-4 px-3 py-1 bg-transparent cursor-pointer rounded-3xl text-center text-sm border border-gray-400 hover:bg-gray-100 transition"
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
          list.map((item, index) => {
            const key = normalizeKey(item);
            const inputId = `${title}-${key}`;
            const isTextarea = item === "Description";
            const isDate = item.includes("Date");

            return (
              <div key={index} className="mb-3 w-full">
                <label
                  htmlFor={inputId}
                  className="font-body font-bold text-sm mb-2 block"
                >
                  {item}
                </label>

                {isTextarea ? (
                  <textarea
                    required
                    placeholder={"Enter " + item}
                    id={inputId}
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="bg-background rounded w-full p-2 mt-1 text-sm resize-y border border-gray-300"
                    rows={4}
                  />
                ) : (
                  <input
                    required
                    placeholder={
                      item === "Address" ? "City, Country" : "Enter " + item
                    }
                    type={
                      item === "Email"
                        ? "email"
                        : item === "Phone Number"
                        ? "tel"
                        : isDate
                        ? "date"
                        : "text"
                    }
                    id={inputId}
                    value={
                      isDate
                        ? normalizeDate(formData[key])
                        : formData[key] || ""
                    }
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="bg-background rounded w-full p-2 mt-1 text-sm border border-gray-300"
                  />
                )}
              </div>
            );
          })}

        {/* Actions */}
        {title !== "Personal Info" && showDetails && (
          <div className="flex justify-between gap-3 m-2">
            {selectedIndex !== null && (
              <button
                className="flex items-center gap-[3px] text-red-500 text-sm cursor-pointer rounded transition-transform duration-200 hover:scale-105 active:scale-95 hover:font-bold border-2 border-red-500 px-3 py-1"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                className="flex items-center gap-[3px] text-sm cursor-pointer rounded transition-transform duration-200 hover:scale-105 active:scale-95 hover:font-bold bg-blue-500 text-white px-3 py-1"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setSelectedIndex(null);
                  setFormData({});
                }}
                className="flex items-center gap-[3px] text-sm cursor-pointer rounded transition-transform duration-200 hover:scale-105 active:scale-95 hover:font-bold border-2 border-gray-700 px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
