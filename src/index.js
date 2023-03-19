import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Artboard from "./artboard/Artboard";
import Nav from "./nav-footer/Nav";
import Panel from "./panel/Panel";

/**
 * ======= Setting initial states and reducer functions ========
 */

const initViewportWidth = document.documentElement.clientWidth;

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
    name: "At-grade",
    leftOffsetFeet: 0,
    heightFeet: 14,
    show: true,
    blocks: [
      {
        show: true,
        type: "sidewalk",
        onCurb: true,
        widthFeet: 12,
        mark: null,
        pop: null,
      },
      {
        show: true,
        type: "drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "downArrow",
        pop: null,
      },
      {
        show: true,
        type: "drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "upAndTurnArrow",
        pop: null,
      },
      {
        show: true,
        type: "sidewalk",
        onCurb: true,
        widthFeet: 12,
        mark: null,
        pop: null,
      },
    ],
  },
  {
    name: "Elevated",
    heightFeet: 10,
    leftOffsetFeet: 10,
    show: true,
    blocks: [
      {
        show: true,
        type: "drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "downArrow",
        pop: null,
      },
      {
        show: true,
        type: "drivelane",
        onCurb: false,
        widthFeet: 11,
        mark: "upAndTurnArrow",
        pop: null,
      },
    ],
  },
];

const schemeReducer = (scheme, action) => {
  const getTargetAndParent = () => {
    if (
      action.level === "layer" ||
      action.action === "rename" ||
      action.action === "setHeight"
    ) {
      return {
        parent: scheme,
        target: scheme[action.layerTarget],
      };
    } else {
      const parent = scheme[action.layerTarget].blocks;
      return {
        parent,
        target: parent[action.blockTarget],
      };
    }
  };

  let { target, parent } = getTargetAndParent();
  const targetIndex = parent.indexOf(target);

  switch (action.action) {
    case "hide":
      parent[targetIndex] = { ...target, show: false };
      break;
    case "show":
      parent[targetIndex] = { ...target, show: true };
      break;
    case "remove":
      if (parent.length > 1) {
        parent = [
          ...parent.slice(0, targetIndex),
          ...parent.slice(targetIndex + 1),
        ];
      }
      break;
    case "add": {
      const added = { ...target };
      if (action.level === "layer") {
        added.name = `Copied ${added.name}`;
      }
      parent = [
        ...parent.slice(0, targetIndex + 1),
        added,
        ...parent.slice(targetIndex + 1),
      ];
      break;
    }
    case "rename":
      parent[targetIndex] = { ...target, name: action.name };
      break;
    case "setHeight":
      parent[targetIndex] = { ...target, heightFeet: action.newHeight };
      break;
    case "setWidth":
      parent[targetIndex] = { ...target, widthFeet: action.newWidth };
      break;
    case "setType":
      parent[targetIndex] = { ...target, type: action.type };
      break;
    default:
      break;
  }

  if (
    action.level === "layer" ||
    action.action === "rename" ||
    action.action === "setHeight"
  ) {
    return parent;
  } else {
    return scheme.map((layer, index) =>
      index === action.layerTarget ? { ...layer, blocks: parent } : layer
    );
  }
};

// Initial buildings ane reducer function to set buildings
const initBuildings = [0, 0];
const buildingsReducer = (building, action) => {
  return action;
};

// Context of currently selected projection, scheme, and buildings
export const Context = React.createContext();

/**
 * ======= Global app component ========
 */

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
    <Context.Provider
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
      <Artboard projection={projection} />
      <Panel shouldExpandOnLoad={initViewportWidth > 900} />
    </Context.Provider>
  );
}

/**
 * ======= Insert global app component to DOM ========
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
