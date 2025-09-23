import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const Content = ({ active, layout, onChangeLayout, color, onChangeColor }) => {
  const personalInfo = ["Full Name", "Email", "Phone Number", "Address"];
  const education = ["School", "Degree", "Start Date", "End Date", "Location"];
  const experience = [
    "Company Name",
    "Position Title",
    "Start Date",
    "End Date",
    "Location",
    "Description",
  ];

  return (
    <div className="flex flex-col h-fit gap-5 rounded">
      {/* Action Buttons */}
      <div className="flex font-body h-fit justify-around rounded p-4 bg-white shadow-lg">
        <button className="flex items-center gap-[3px] text-red-500 text-sm cursor-pointer rounded transition-transform duration-200 hover:scale-105 active:scale-95 hover:font-bold">
          <FontAwesomeIcon icon={faTrash} className="text-red-500" />
          Delete Resume
        </button>

        <button className="flex items-center text-sm cursor-pointer gap-[3px] rounded transition-transform duration-200 hover:scale-105 active:scale-95 hover:font-bold">
          <FontAwesomeIcon icon={faDownload} />
          Load Example
        </button>
      </div>

      {/* Resume Mode */}
      {active === "resume" && (
        <>
          <Card list={personalInfo} title="Personal Info" />
          <Card list={education} title="Education" />
          <Card list={experience} title="Experience" />
        </>
      )}

      {/* Settings Mode */}
      {active !== "resume" && (
        <>
          {/* Layout Section */}
          <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
            <h2 className="font-heading text-xl mb-2">Layout</h2>
            <div className="flex gap-4">
              {/* Top */}
              <div className="w-10 h-15 flex flex-col items-center justify-center hover:scale-105 transition">
                <button
                  onClick={() => onChangeLayout("top")}
                  className={`w-full h-14 border rounded overflow-hidden flex flex-col ${
                    layout === "top" ? "ring-1" : ""
                  }`}
                  style={{ ringColor: color }}
                >
                  <div
                    className="w-full h-1/2"
                    style={{ backgroundColor: color }}
                  />
                  <div className="w-full h-1/2 bg-white" />
                </button>
                <div className="text-sm mt-1">Top</div>
              </div>

              {/* Left */}
              <div className="w-10 h-15 flex flex-col items-center justify-center hover:scale-105 transition">
                <button
                  onClick={() => onChangeLayout("left")}
                  className={`w-full h-14 border rounded overflow-hidden flex flex-row ${
                    layout === "left" ? "ring-1" : ""
                  }`}
                  style={{ ringColor: color }}
                >
                  <div
                    className="w-1/2 h-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="w-1/2 h-full bg-white" />
                </button>
                <div className="text-sm mt-1">Left</div>
              </div>

              {/* Right */}
              <div className="w-10 h-15 flex flex-col items-center justify-center hover:scale-105 transition">
                <button
                  onClick={() => onChangeLayout("right")}
                  className={`w-full h-14 border rounded overflow-hidden flex flex-row ${
                    layout === "right" ? "ring-1" : ""
                  }`}
                  style={{ ringColor: color }}
                >
                  <div className="w-1/2 h-full bg-white" />
                  <div
                    className="w-1/2 h-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
                <div className="text-sm mt-1">Right</div>
              </div>
            </div>
          </div>

          {/* Color Section */}
          <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
            <h2 className="font-heading text-xl mb-2">Color</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm">Accent Color</span>
              <input
                type="color"
                value={color}
                onChange={(e) => onChangeColor(e.target.value)}
                className="w-10 h-10 p-0 border-0 cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
