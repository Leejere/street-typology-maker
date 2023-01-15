import React, { useState } from "react";
import "./Artboard.css";
import PropTypes from "prop-types";
import SectionArtboard from "./SectionArtboard";
import PlanArtboard from "./PlanArtboard";
import AxonArtboard from "./AxonArtboard";

function Artboard(props) {
  switch (props.projection) {
    case "Section":
      return <SectionArtboard />;
    case "Plan":
      return <PlanArtboard />;
    default:
      return <AxonArtboard />;
  }
}

Artboard.propTypes = {
  projection: PropTypes.string.isRequired,
};

export default Artboard;
