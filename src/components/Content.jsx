import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

// Constant form fields
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

// Layout preview options
const layoutOptions = [
  {
    id: "top",
    label: "Top",
    classes: "flex-col",
    sections: [
      { className: "w-full h-1/2" },
      { className: "w-full h-1/2 bg-white" },
    ],
  },
  {
    id: "left",
    label: "Left",
    classes: "flex-row",
    sections: [
      { className: "w-1/2 h-full" },
      { className: "w-1/2 h-full bg-white" },
    ],
  },
  {
    id: "right",
    label: "Right",
    classes: "flex-row",
    sections: [
      { className: "w-1/2 h-full bg-white" },
      { className: "w-1/2 h-full" },
    ],
  },
];

const Content = ({
  active,
  layout,
  onChangeLayout,
  color,
  onChangeColor,
  handlePrint,
  personData,
  addPersonalInfo,
  addEducation,
  addExperience,
  resetResume,
}) => {
  return (
    <div className="flex flex-col h-fit gap-5 rounded">
      {/* Action Buttons */}
      <header className="flex justify-around items-center font-body h-fit rounded p-4 bg-white shadow-lg">
        <button
          onClick={resetResume}
          className="flex items-center gap-2 text-sm text-red-500 transition-transform hover:scale-105 active:scale-95 hover:font-bold"
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete Resume
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-sm transition-transform hover:scale-105 active:scale-95 hover:font-bold"
        >
          <FontAwesomeIcon icon={faDownload} />
          Download Resume
        </button>
      </header>

      {/* Resume Info Mode */}
      {active === "resume" && (
        <>
          <Card
            list={personalInfo}
            title="Personal Info"
            personData={personData.personalInfo}
            addPersonalInfo={addPersonalInfo}
          />
          <Card
            list={education}
            title="Education"
            personData={personData.education}
            addEducation={addEducation}
          />
          <Card
            list={experience}
            title="Experience"
            personData={personData.experience}
            addExperience={addExperience}
          />
        </>
      )}

      {/* Appearance Mode */}
      {active !== "resume" && (
        <>
          {/* Layout Section */}
          <section className="flex flex-col gap-4 rounded p-4 bg-white shadow-lg">
            <h2 className="font-heading text-xl">Layout</h2>
            <div className="flex gap-6">
              {layoutOptions.map(({ id, label, classes, sections }) => (
                <div
                  key={id}
                  className="w-10 flex flex-col items-center hover:scale-105 transition"
                >
                  <button
                    onClick={() => onChangeLayout(id)}
                    className={`w-full h-10 border rounded overflow-hidden flex ${classes} ${
                      layout === id ? "ring-2" : ""
                    }`}
                    style={{ "--tw-ring-color": color }}
                  >
                    {sections.map((section, idx) => (
                      <div
                        key={idx}
                        className={section.className}
                        style={{
                          backgroundColor: section.className.includes(
                            "bg-white"
                          )
                            ? ""
                            : color,
                        }}
                      />
                    ))}
                  </button>
                  <span className="text-sm mt-1">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Color Section */}
          <section className="flex flex-col gap-3 rounded p-4 bg-white shadow-lg">
            <h2 className="font-heading text-xl">Color</h2>
            <label className="flex items-center gap-3 text-sm">
              <span>Accent Color</span>
              <input
                type="color"
                value={color}
                onChange={(e) => onChangeColor(e.target.value)}
                className="w-10 h-10 cursor-pointer border-0"
              />
            </label>
          </section>
        </>
      )}
    </div>
  );
};

export default Content;
