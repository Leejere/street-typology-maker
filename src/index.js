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

const initScheme = [
  {
    layer: 1,
    leftOffsetFeet: 0,
    heightFeet: 14,
    blocks: [
      {
        type: "Sidewalk",
        onCurb: true,
        widthFeet: 12,
        mark: null,
        pop: null,
      },
      {
        type: "Drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "downArrow",
        pop: null,
      },
      {
        type: "Drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "upAndTurnArrow",
        pop: null,
      },
      {
        type: "Sidewalk",
        onCurb: true,
        widthFeet: 12,
        mark: null,
        pop: null,
      },
    ],
  },
  {
    layer: 2,
    heightFeet: 10,
    leftOffsetFeet: 20,
    blocks: [
      {
        type: "Drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "downArrow",
        pop: null,
      },
      {
        type: "Drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "upAndTurnArrow",
        pop: null,
      },
    ],
  },
  {
    layer: 3,
    heightFeet: 10,
    leftOffsetFeet: 0,
    blocks: [],
  },
];

function App() {
  const [projection, setProjection] = useState("Section");
  const [scheme, setScheme] = useState(initScheme);
  return (
    <>
      <Nav />
      <Artboard projection={projection} scheme={scheme} />

      {/* `handleProjChange` deals with change between Section, Axon, or Plan */}
      <Panel
        handleProjChange={(newProjection) => {
          setProjection(newProjection);
        }}
        updateScheme={(newScheme) => {
          setScheme(newScheme);
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
