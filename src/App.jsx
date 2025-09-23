import React, { useState, useRef } from "react";
import Controllers from "./components/Controllers";
import Content from "./components/Content";
import Template from "./components/Template";
import { useReactToPrint } from "react-to-print";

function App() {
  const [active, setActive] = useState("resume");
  const [layout, setLayout] = useState("top");
  const [color, setColor] = useState("#000");
  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "resume",
  });

  return (
    <div className="App flex flex-col md:flex-row h-screen max-w-screen gap-6 p-5">
      {/* Left side: Controllers + Content */}
      <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col lg:flex-row gap-6">
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
          />
        </div>
      </div>

      {/* Right side: Template */}
      <div className="w-full md:w-1/2 lg:w-1/2 ">
        <Template ref={resumeRef} layout={layout} color={color} />
      </div>
    </div>
  );
}

export default App;
