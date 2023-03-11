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
  const initDisplay = shouldExpandOnLoad ? "flex" : "none";
  const initToggleIcon = shouldExpandOnLoad ? "expand_less" : "expand_more";
  const initToggleText = shouldExpandOnLoad ? "Collapse" : "Expand";
  const initState = {
    expanded: shouldExpandOnLoad,
    display: initDisplay,
    toggleIcon: initToggleIcon,
    toggleText: initToggleText,
  };

  // Set panel state
  const [panelState, setPanelState] = useState(initState);

  const onPanelToggle = () => {
    if (panelState.expanded) {
      setPanelState({
        expanded: false,
        display: "none",
        toggleIcon: "expand_more",
        toggleText: "Expand",
      });
    } else {
      setPanelState({
        expanded: true,
        display: "flex",
        toggleIcon: "expand_less",
        toggleText: "Collapse",
      });
    }
  };

  const ToggleButton = (
    <Button
      className={panelStyles.toggle}
      onClick={onPanelToggle}
      variant="light"
    >
      <span className="material-symbols-outlined">{panelState.toggleIcon}</span>
    </Button>
  );

  return (
    <div className={panelStyles.package}>
      {ToggleButton}

      {/* Panel section */}
      <section
        className={panelStyles.main}
        style={{ display: panelState.display }}
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
