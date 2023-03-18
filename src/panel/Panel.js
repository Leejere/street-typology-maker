import React, { useState, memo } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import PanelToggle from "./PanelToggle";
import ProjectionSelect from "./ProjectionSelect";
import SchemeSetter from "./SchemeSetter";
import PropTypes from "prop-types";

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

  const panelShouldDisplay = panelExpanded ? "flex" : "none";

  return (
    <div className={panelStyles.package}>
      <PanelToggle
        onPanelToggle={() => onPanelToggle()}
        toggleIcon={toggleIcon}
      />
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

export default memo(Panel);
