import React, { useState, useRef, useCallback } from "react";
import Controllers from "./components/Controllers";
import Content from "./components/Content";
import Template from "./components/Template";
import { useReactToPrint } from "react-to-print";

function App() {
  const [active, setActive] = useState("resume");
  const [personalInfo, setPersonalInfo] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [layout, setLayout] = useState("top");
  const [color, setColor] = useState("#000");

  const resumeRef = useRef();

  // 🖨️ Print resume
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "resume",
  });

  // ♻️ Reset all resume data
  const resetResume = useCallback(() => {
    setPersonalInfo({});
    setEducation([]);
    setExperience([]);
  }, []);

  // ✍️ Update personal info
  const updatePersonalInfo = useCallback((newInfo) => {
    setPersonalInfo(newInfo);
  }, []);

  // 🔄 Generic array updater (add, update, delete)
  const updateList = useCallback((setState) => {
    return (data, index = null, del = false) => {
      setState((prev) => {
        const copy = [...prev];

        if (del && index !== null) {
          copy.splice(index, 1); // delete
        } else if (index !== null && data) {
          copy[index] = data; // update
        } else if (data) {
          copy.push(data); // add new
        }

        return copy;
      });
    };
  }, []);

  const updateEducation = updateList(setEducation);
  const updateExperience = updateList(setExperience);

  const personData = { personalInfo, education, experience };

  return (
    <div className="App flex flex-col md:flex-row h-screen max-w-screen gap-6 p-5">
      {/* Left side: Controllers + Content */}
      <div className="w-full md:w-1/2 flex flex-col lg:flex-row gap-6">
        {/* Controllers */}
        <div className="w-full lg:w-1/3">
          <Controllers active={active} onChangeActive={setActive} />
        </div>

        {/* Content */}
        <div className="w-full lg:w-2/3">
          <Content
            active={active}
            layout={layout}
            onChangeLayout={setLayout}
            color={color}
            onChangeColor={setColor}
            handlePrint={handlePrint}
            personData={personData}
            addPersonalInfo={updatePersonalInfo}
            addEducation={updateEducation}
            addExperience={updateExperience}
            resetResume={resetResume}
          />
        </div>
      </div>

      {/* Right side: Template */}
      <div className="w-full md:w-1/2">
        <Template
          ref={resumeRef}
          layout={layout}
          color={color}
          personData={personData}
        />
      </div>
    </div>
  );
}

export default App;
