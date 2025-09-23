import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const Content = ({ active }) => {
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

      {/* Personal Info */}
      {active === "resume" && (
        <Card list={personalInfo} title="Personal Info" />
      )}
      {/* Education */}
      {active === "resume" && <Card list={education} title="Education" />}
      {/* Experience */}
      {active === "resume" && <Card list={experience} title="Experience" />}

      {active !== "resume" && (
        <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
          <h2 className="font-heading text-xl border-b-2 w-fit flex items-center gap-2">
            Layout
          </h2>
        </div>
      )}
      {active !== "resume" && (
        <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
          <h2 className="font-heading text-xl border-b-2 w-fit flex items-center gap-2">
            Color
          </h2>
        </div>
      )}
      {active !== "resume" && (
        <div className="flex flex-col h-fit rounded p-4 bg-white shadow-lg mb-4">
          <h2 className="font-heading text-xl border-b-2 w-fit flex items-center gap-2">
            Fonts
          </h2>
        </div>
      )}
    </div>
  );
};

export default Content;
