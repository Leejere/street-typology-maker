import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Artboard from "./artboard/Artboard";
import Nav from "./nav-footer/Nav";
import reportWebVitals from "./reportWebVitals";
import Panel from "./panel/Panel";

export const globalStates = {
  viewportWidth: document.documentElement.clientWidth,
  projection: "Section",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  const [projection, setProjection] = useState("Section");
  return (
    <>
      <Nav />
      <Artboard projection={projection} />

      {/* `handleProjChange` deals with change between Section, Axon, or Plan */}
      <Panel
        handleProjChange={(projection) => {
          setProjection(projection);
        }}
      />
    </>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(console.log);
