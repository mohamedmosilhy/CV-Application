import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Card = ({ list, title }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-xl border-b-2 w-fit flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-700" />
          {title}
        </h2>
        {title !== "Personal Info" ? (
          <FontAwesomeIcon
            icon={faArrowUp}
            className={`text-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setExpanded(!expanded)}
          />
        ) : null}
      </div>

      {/* Animated Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          title === "Personal Info"
            ? "opacity-100 max-h-screen"
            : expanded
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0"
        }`}
      >
        {list.map((item, index) => {
          const inputId = `${title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")}-${item
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")}`;

          const isTextarea = item === "Description";

          return (
            <div key={index} className="mb-3">
              <label
                htmlFor={inputId}
                className="font-body font-bold text-sm mb-2"
              >
                {item}
              </label>

              {isTextarea ? (
                <textarea
                  required
                  placeholder={"Enter " + item}
                  id={inputId}
                  className="bg-background rounded w-full p-1 mt-1 text-sm resize-y"
                  rows={4}
                />
              ) : (
                <input
                  required
                  placeholder={
                    item === "Address" ? "City, Country," : "Enter " + item
                  }
                  type={
                    item === "Email"
                      ? "email"
                      : item === "Phone Number"
                      ? "tel"
                      : item.includes("Date")
                      ? "date"
                      : "text"
                  }
                  id={inputId}
                  className="bg-background rounded w-full p-1 mt-1 text-sm"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
