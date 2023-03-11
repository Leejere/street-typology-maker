import React, { useContext } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import Button from "react-bootstrap/Button";
import { Context } from "../index";

// Set of buttons to change current projection
function ProjectionSelect() {
  const context = useContext(Context);
  const projections = ["Section", "Plan", "Axon"];

  const ReprojectButtons = projections.map((projection) => {
    const variant = projection === context.projection ? "primary" : "secondary";
    return (
      <Button
        variant={variant}
        className={`${panelStyles.button}`}
        key={projection}
        onClick={() => context.setProjection(projection)}
      >
        {projection}
      </Button>
    );
  });
  return (
    <div className={panelStyles.itemGroup}>
      <div className={panelStyles.subtitle}>Select Projection</div>
      <div className={panelStyles.buttonGroup}>{ReprojectButtons}</div>
    </div>
  );
}

export default ProjectionSelect;
