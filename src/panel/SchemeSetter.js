import React, { useContext } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import { Context } from "../index";
import PropTypes from "prop-types";
import AddRemoveHideButtons from "./AddRemoveHideButtons";

function BlockSetter() {}

function LayerSetter({ layer, target }) {
  // The "visible" button dependent on whether this layer is visible
  return (
    <div className={schemeSetterStyles.layer}>
      <div className={schemeSetterStyles.layerName}>
        {layer.name}
        <AddRemoveHideButtons
          visible={layer.show}
          level={"layer"}
          layerTarget={target}
        />
      </div>
    </div>
  );
}

LayerSetter.propTypes = {
  layer: PropTypes.object,
  target: PropTypes.number,
};

function SchemeSetter() {
  const context = useContext(Context);
  const LayersSetters = context.scheme.map((layer, index) => {
    return <LayerSetter key={index} layer={layer} target={index} />;
  });
  return (
    <div className={panelStyles.itemGroup}>
      <div className={panelStyles.subtitle}>Edit Typology</div>
      {LayersSetters}
    </div>
  );
}

export default SchemeSetter;
