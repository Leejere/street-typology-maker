import React, { useState } from "react";
import "./Artboard.css";
import PropTypes from "prop-types";
import SectionArtboard from "./SectionArtboard";
import PlanArtboard from "./PlanArtboard";
import AxonArtboard from "./AxonArtboard";

function Artboard({ projection, scheme }) {
  switch (projection) {
    case "Section":
      return <SectionArtboard scheme={scheme} />;
    case "Plan":
      return <PlanArtboard scheme={scheme} />;
    default:
      return <AxonArtboard scheme={scheme} />;
  }
}

Artboard.propTypes = {
  projection: PropTypes.string.isRequired,
  scheme: PropTypes.array.isRequired,
};

export default Artboard;
