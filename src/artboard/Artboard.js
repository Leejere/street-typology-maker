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
  const projectionArtboard =
    projection === "Section" ? (
      <SectionArtboard scheme={scheme} buildings={buildings} />
    ) : projection === "Plan" ? (
      <PlanArtboard scheme={scheme} buildings={buildings} />
    ) : (
      <AxonArtboard scheme={scheme} buildings={buildings} />
    );

  return <section className="artboard">{projectionArtboard}</section>;
}

Artboard.propTypes = {
  projection: PropTypes.string.isRequired,
  scheme: PropTypes.array.isRequired,
  buildings: PropTypes.array.isRequired,
};

export default Artboard;
