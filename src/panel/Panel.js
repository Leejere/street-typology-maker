import React, { useState, useContext } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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

function AddRemoveHideButtons() {
  const buttonContents = ["add_circle", "do_not_disturb_on", "visibility"];
  const Buttons = buttonContents.map((content) => (
    <OverlayTrigger
      key={content}
      placement={"top"}
      overlay={<Tooltip id={`tooltip-${content}`}>Tooltip</Tooltip>}
    >
      <Button variant="light" className={schemeSetterStyles.actionButton}>
        <span className="material-symbols-outlined">{content}</span>
      </Button>
    </OverlayTrigger>
  ));
  return <div className={schemeSetterStyles.buttonGroup}>{Buttons}</div>;
}

function BlockSetter() {}

function LayerSetter({ layer }) {
  return (
    <div className={schemeSetterStyles.layer}>
      <div className={schemeSetterStyles.layerName}>
        {layer.name}
        <AddRemoveHideButtons />
      </div>
    </div>
  );
}

LayerSetter.propTypes = {
  layer: PropTypes.object,
};

function SchemeSetter() {
  const context = useContext(Context);
  const LayersSetters = context.scheme.map((layer, index) => {
    return <LayerSetter key={index} layer={layer} />;
  });
  return (
    <div className={panelStyles.itemGroup}>
      <div className={panelStyles.subtitle}>Edit Typology</div>
      {LayersSetters}
    </div>
  );
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
