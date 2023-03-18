import React, { useState, useContext } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import ProjectionSelect from "./ProjectionSelect";

import SchemeSetter from "./SchemeSetter";

// Panel
function Panel({ shouldExpandOnLoad }) {
  // Initial state
  const panelInitExpanded = shouldExpandOnLoad;

  // Set panel state
  const [panelExpanded, setPanelState] = useState(panelInitExpanded);

  const onPanelToggle = () => {
    setPanelState(!panelExpanded);
  };
  const toggleIcon = panelExpanded ? "expand_less" : "expand_more";
  // Button determining whether the panel should be shown
  const ToggleButton = (
    <Button
      className={panelStyles.toggle}
      onClick={onPanelToggle}
      variant="light"
    >
      <span className="material-symbols-outlined">{toggleIcon}</span>
    </Button>
  );

  const panelShouldDisplay = panelExpanded ? "flex" : "none";

  return (
    <div className={panelStyles.package}>
      {ToggleButton}

      {/* Panel section */}
      <section
        className={panelStyles.main}
        style={{ display: panelShouldDisplay }}
      >
        <ProjectionSelect />
        <SchemeSetter />
      </section>
    </div>
  );
}

Panel.propTypes = {
  shouldExpandOnLoad: PropTypes.bool,
};

export default Panel;
