import React, { useState } from "react";
import "./Artboard.css";
import PropTypes from "prop-types";
import SectionArtboard from "./SectionArtboard";
import PlanArtboard from "./PlanArtboard";
import AxonArtboard from "./AxonArtboard";

export const BUILDING_DICT = {
  0: {
    path: "",
    widthFeet: 30,
    heightFeet: 40,
  },
  1: {
    path: "",
    widthFeet: 30,
    heightFeet: 20,
  },
};

function Artboard({ projection, scheme, buildings }) {
  switch (projection) {
    case "Section":
      return <SectionArtboard scheme={scheme} buildings={buildings} />;
    case "Plan":
      return <PlanArtboard scheme={scheme} buildings={buildings} />;
    default:
      return <AxonArtboard scheme={scheme} buildings={buildings} />;
  }
}

Artboard.propTypes = {
  projection: PropTypes.string.isRequired,
  scheme: PropTypes.array.isRequired,
  buildings: PropTypes.array.isRequired,
};

export default Artboard;
