import React, { useContext, memo } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import { Context } from "../index";
import PropTypes from "prop-types";
import AddRemoveHideButtons from "./AddRemoveHideButtons";
import LayerRenamer from "./LayerRenamer";

function BlockSetter() {}

function LayerSetter({ layer, layerIndex }) {
  // The "visible" button dependent on whether this layer is visible
  return (
    <div className={schemeSetterStyles.layer}>
      <LayerRenamer layer={layer} layerIndex={layerIndex} />
      <AddRemoveHideButtons
        visible={layer.show}
        level={"layer"} // either "layer" or "block"
        layerTarget={layerIndex} // Index of the layer subject to edit
      />
    </div>
  );
}

LayerSetter.propTypes = {
  layer: PropTypes.object,
  layerIndex: PropTypes.number,
};

function SchemeSetter() {
  const context = useContext(Context);
  const LayersSetters = context.scheme.map((layer, index) => {
    return <LayerSetter key={index} layer={layer} layerIndex={index} />;
  });
  return (
    <div className={panelStyles.itemGroup}>
      <div className={panelStyles.subtitle}>Edit Typology</div>
      {LayersSetters}
    </div>
  );
}

export default memo(SchemeSetter);
