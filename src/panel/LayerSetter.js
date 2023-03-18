import React, { useContext, memo } from "react";
import "../styles/styles.scss";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import PropTypes from "prop-types";
import AddRemoveHideButtons from "./AddRemoveHideButtons";
import LayerRenamer from "./LayerRenamer";
import BlockSetter from "./BlockSetter";
import NumberSetter from "./NumberSetter";
import { Context } from "..";

function LayerSetter({ layer, layerIndex }) {
  // The "visible" button dependent on whether this layer is visible
  const context = useContext(Context);
  const blocks = layer.blocks;
  const layerSetter = (
    <div className={schemeSetterStyles.layer}>
      <LayerRenamer layer={layer} layerIndex={layerIndex} />
      <NumberSetter
        initValue={Number(layer.heightFeet)}
        placeholder={"height"}
        onChange={(newHeight) => {
          context.setScheme({
            action: "setHeight",
            layerTarget: layerIndex,
            newHeight: newHeight,
          });
        }}
      />
      <AddRemoveHideButtons
        visible={layer.show}
        level={"layer"} // either "layer" or "block"
        layerTarget={layerIndex} // Index of the layer subject to edit
      />
    </div>
  );
  const blockSetters = blocks.map((block, index) => {
    return <BlockSetter key={index} block={block} blockIndex={index} />;
  });
  return (
    <>
      {layerSetter}
      {blockSetters}
    </>
  );
}

LayerSetter.propTypes = {
  layer: PropTypes.object,
  layerIndex: PropTypes.number,
};

export default memo(LayerSetter);
