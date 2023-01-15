import React, { useState } from "react";
import "./Artboard.css";
import PropTypes from "prop-types";

function Artboard(props) {
  return <div className="artboard">{props.projection}</div>;
}

Artboard.propTypes = {
  projection: PropTypes.string.isRequired,
};

export default Artboard;
