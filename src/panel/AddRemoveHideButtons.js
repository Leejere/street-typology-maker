import React, { useState, useContext } from "react";
import "../styles/styles.scss";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Context } from "..";
import PropTypes from "prop-types";

function AddRemoveHideButtons({ visible, level, layerTarget }) {
  const context = useContext(Context);
  const setHideIcon = visible ? "visibility" : "visibility_off";
  const setHideAction = visible ? "hide" : "show";
  const buttons = [
    {
      icon: "add_circle",
      tooltip: "Add Level",
      action: "add",
    },
    {
      icon: "do_not_disturb_on",
      tooltip: "Remove Level",
      action: "remove",
    },
    {
      icon: setHideIcon,
      tooltip: "Hide Level",
      action: setHideAction,
    },
  ];

  const Buttons = buttons.map((item, index) => (
    <OverlayTrigger
      key={index}
      placement={"top"}
      overlay={<Tooltip id={`tooltip-${item.action}`}>{item.tooltip}</Tooltip>}
    >
      <Button
        variant="light"
        className={schemeSetterStyles.actionButton}
        onClick={() =>
          context.setScheme({
            level: level,
            layerTarget: layerTarget,
            action: item.action,
          })
        }
      >
        <span className="material-symbols-outlined">{item.icon}</span>
      </Button>
    </OverlayTrigger>
  ));
  return <div className={schemeSetterStyles.buttonGroup}>{Buttons}</div>;
}

AddRemoveHideButtons.propTypes = {
  visible: PropTypes.bool,
  level: PropTypes.string, // either "layer" or "block"
  layerTarget: PropTypes.number, // index of the target that the buttons control
};

export default AddRemoveHideButtons;
