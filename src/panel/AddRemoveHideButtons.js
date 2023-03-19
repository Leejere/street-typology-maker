import React, { useContext } from "react";
import "../styles/styles.scss";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import Button from "react-bootstrap/Button";
import { Context } from "..";
import PropTypes from "prop-types";

function AddRemoveHideButtons({ visible, level, layerTarget, blockTarget }) {
  const context = useContext(Context);
  const setHideIcon = visible ? "visibility" : "visibility_off";
  const setHideAction = visible ? "hide" : "show";
  const setHideTooltip = visible ? "Hide Level" : "Show Level";
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
      tooltip: setHideTooltip,
      action: setHideAction,
    },
  ];

  const Buttons = buttons.map((item, index) => (
    <Button
      key={index}
      variant="primary"
      className={schemeSetterStyles.actionButton}
      onClick={() =>
        context.setScheme({
          level: level,
          layerTarget: layerTarget,
          blockTarget: blockTarget,
          action: item.action,
        })
      }
    >
      <span className="material-symbols-outlined">{item.icon}</span>
    </Button>
  ));
  return <div className={schemeSetterStyles.buttonGroup}>{Buttons}</div>;
}

AddRemoveHideButtons.propTypes = {
  visible: PropTypes.bool,
  level: PropTypes.string, // either "layer" or "block"
  layerTarget: PropTypes.number, // index of the target that the buttons control
  blockTarget: PropTypes.number,
};

export default AddRemoveHideButtons;
