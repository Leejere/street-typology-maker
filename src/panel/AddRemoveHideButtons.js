import React, { useState, useContext } from "react";
import "../styles/styles.scss";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Context } from "..";
import PropTypes from "prop-types";

function AddRemoveHideButtons({ visible }) {
  const context = useContext(Context);
  const buttonContents = ["add_circle", "do_not_disturb_on", visible];
  const buttonTooltips = ["Add Level", "Remove Level", "Hide Level"];

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

AddRemoveHideButtons.propTypes = {
  visible: PropTypes.string,
};

export default AddRemoveHideButtons;
