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

function Artboard({ projection }) {
  const projectionArtboard =
    projection === "Axon" ? (
      <AxonArtboard />
    ) : projection === "Plan" ? (
      <PlanArtboard />
    ) : (
      <SectionArtboard />
    );

  return <section className="artboard">{projectionArtboard}</section>;
}

Artboard.propTypes = {
  projection: PropTypes.string.isRequired,
};

export default Artboard;
