import React, { useState } from "react";
import Controllers from "./components/Controllers";
import Content from "./components/Content";
import Template from "./components/Template";

function App() {
  const [active, setActive] = useState("resume");
  const [layout, setLayout] = useState("top");
  const [color, setColor] = useState("#000");

  return (
    <div className="App grid grid-cols-6 h-screen max-w-screen gap-6 p-5">
      <div className="col-span-1">
        <Controllers active={active} onChangeActive={setActive} />
      </div>
      <div className="col-span-2">
        <Content
          active={active}
          layout={layout}
          onChangeLayout={setLayout}
          color={color}
          onChangeColor={setColor}
        />
      </div>
      <div className="col-span-3">
        <Template />
      </div>
    </div>
  );
}

export default App;
