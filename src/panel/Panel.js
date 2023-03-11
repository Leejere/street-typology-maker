import React, { useState, useContext } from "react";
import panelStyles from "../styles/panel/Panel.module.css";
import { Context } from "../index";
import PropTypes from "prop-types";

// Set of buttons to change current projection
function ProjectionSelect() {
  const context = useContext(Context);
  const projections = ["Section", "Plan", "Axon"];

  const ReprojectButtons = projections.map((projection) => {
    return (
      <button
        className={`${panelStyles.button}`}
        key={projection}
        onClick={() => context.setProjection(projection)}
      >
        {projection}
      </button>
    );
  });
  return (
    <div className={panelStyles.itemGroup}>
      <div className={panelStyles.subtitle}>Select Projection</div>
      <div className={panelStyles.buttonGroup}>{ReprojectButtons}</div>
    </div>
  );
}

function BlockEdit() {}

function LayerEdit() {}

function SchemeEdit() {
  const context = useContext(Context);
}

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
    <button
      className={`${panelStyles.button} ${panelStyles.toggle}`}
      onClick={onPanelToggle}
    >
      <span className="material-symbols-outlined">{panelState.toggleIcon}</span>
      <span>{panelState.toggleText}</span>
    </button>
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
      </section>
    </div>
  );
}

Panel.propTypes = {
  shouldExpandOnLoad: PropTypes.bool,
};

export default Panel;
