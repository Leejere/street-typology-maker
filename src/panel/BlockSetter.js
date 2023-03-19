import React, { useContext, memo } from "react";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import PropTypes from "prop-types";
import AddRemoveHideButtons from "./AddRemoveHideButtons";
import NumberSetter from "./NumberSetter";
import { Context } from "..";
import {
  faCar,
  faPersonWalking,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/styles.scss";
import DropdownSelect from "./DropdownSelect";

const options = {
  drivelane: { label: "Drivelane", icon: faCar },
  sidewalk: { label: "Sidewalk", icon: faPersonWalking },
  median: { label: "Median", icon: faTree },
};

function BlockSetter({ block, blockIndex, layerIndex }) {
  // The "visible" button dependent on whether this layer is visible
  const context = useContext(Context);
  const typeSetter = (
    <DropdownSelect
      variant={"primary"}
      initValue={block.type}
      options={options}
      onSelect={(type) =>
        context.setScheme({
          action: "setType",
          layerTarget: layerIndex,
          blockTarget: blockIndex,
          type: type,
        })
      }
    />
  );

  const widthSetter = (
    <NumberSetter
      isSmall={true}
      initValue={Number(block.widthFeet)}
      placeholder={"width"}
      onChange={(newWidth) =>
        context.setScheme({
          action: "setWidth",
          layerTarget: layerIndex,
          blockTarget: blockIndex,
          newWidth: newWidth,
        })
      }
    />
  );

  const actionButtons = (
    <AddRemoveHideButtons
      visible={block.show}
      level={"block"}
      layerTarget={layerIndex}
      blockTarget={blockIndex}
    />
  );
  return (
    <div className={schemeSetterStyles.block}>
      {typeSetter}
      {widthSetter}
      {actionButtons}
    </div>
  );
}

BlockSetter.propTypes = {
  block: PropTypes.object,
  blockIndex: PropTypes.number,
  layerIndex: PropTypes.number, // Index of the layer the block is in
};

export default memo(BlockSetter);
