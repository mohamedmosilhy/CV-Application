import Controllers from "./components/Controllers";
import Content from "./components/Content";
import Template from "./components/Template";

function App() {
  return (
    <div className="App grid-cols-4 grid h-screen w-screen gap-10 p-5">
      <Controllers className="col-span-1" />
      <Content className="col-span-1" />
      <Template className="col-span-2" />
    </div>
  );
}

export default App;
