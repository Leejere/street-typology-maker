import React, { useState, useContext } from "react";
import "./Panel.css";
import { globalStates } from "../index";
import { paramsContext } from "../index";
import PropTypes from "prop-types";

// Set of buttons to change current projection
function ReprojectButtons() {
  const context = useContext(paramsContext);
  const projections = ["Section", "Plan", "Axon"];
  return (
    <>
      {projections.map((projection) => {
        return (
          <button
            key={projection}
            onClick={() => context.setProjection(projection)}
          >
            {projection}
          </button>
        );
      })}
    </>
  );
}

ReprojectButtons.propTypes = {
  handleProjChange: PropTypes.func,
};

// Panel
function Panel() {
  // Initial state
  const shouldExpandOnLoad = globalStates.viewportWidth > 900 ? true : false;
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

  // Inherit context
  const context = useContext(paramsContext);
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

  return (
    <div className="panel-container">
      {/* Toggle button */}
      <button className="panel-toggle" onClick={onPanelToggle}>
        <span className="material-symbols-outlined">
          {panelState.toggleIcon}
        </span>
        <span>{panelState.toggleText}</span>
      </button>

      {/* Panel section */}
      <section className="panel" style={{ display: panelState.display }}>
        <ReprojectButtons />
      </section>
    </div>
  );
}

Panel.propTypes = {
  handleProjChange: PropTypes.func,
};

export default Panel;
