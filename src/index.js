import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Artboard from "./artboard/Artboard";
import Nav from "./nav-footer/Nav";
import Panel from "./panel/Panel";

export const globalStates = {
  viewportWidth: document.documentElement.clientWidth,
  projection: "Section",
};

// Initial projection and reducer function to set projection
const initProjection = "Section";
const projectionReducer = (projection, newProjection) => {
  return newProjection;
};

// Initial scheme and reducer function to set the scheme
// Initial scheme is an array, each item representing a layer
// In each layer, the `blocks` element is an array containing each block
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
const schemeReducer = (scheme, action) => {
  return action;
};

// Initial buildings ane reducer function to set buildings
const initBuildings = [0, 0];
const buildingsReducer = (building, action) => {
  return action;
};

// Context of currently selected projection, scheme, and buildings
export const paramsContext = React.createContext();

function App() {
  // State 1: Projection: either section, or plan, or axon
  const [projection, projectionDispatch] = useReducer(
    projectionReducer,
    initProjection
  );
  // State 2: The specific scheme proposed
  const [scheme, schemeDispatch] = useReducer(schemeReducer, initScheme);
  // State 3: Complementary buildings
  const [buildings, buildingsDispatch] = useReducer(
    buildingsReducer,
    initBuildings
  );
  return (
    <paramsContext.Provider
      value={{
        scheme: scheme,
        setScheme: schemeDispatch,
        projection: projection,
        setProjection: projectionDispatch,
        buildings: buildings,
        setBuildings: buildingsDispatch,
      }}
    >
      <Nav />
      {/* Artboard: presenting the result */}
      <Artboard projection={projection} scheme={scheme} buildings={buildings} />
      {/* Panel: Setting parameters */}
      <Panel />
    </paramsContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
