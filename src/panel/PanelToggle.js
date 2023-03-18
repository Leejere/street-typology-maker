import React, { memo } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function PanelToggle({ onPanelToggle, toggleIcon }) {
  return (
    <Button
      className={panelStyles.toggle}
      onClick={onPanelToggle}
      variant="light"
    >
      <span className="material-symbols-outlined">{toggleIcon}</span>
    </Button>
  );
}

PanelToggle.propTypes = {
  onPanelToggle: PropTypes.func,
  toggleIcon: PropTypes.string,
};

export default memo(PanelToggle);
